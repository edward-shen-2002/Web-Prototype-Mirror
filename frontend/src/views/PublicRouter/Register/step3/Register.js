import React, { useState } from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { Formik } from "formik";

import { publicAxios } from "@tools/rest";

import { ROLE_LEVEL_NOT_APPLICABLE } from "@constants/roles";
import { REST_PUBLIC_REGISTER, REST_PUBLIC_DATA } from "@constants/rest";
import { ROUTE_PUBLIC_REGISTER_STEP2, ROUTE_PUBLIC_LOGIN, ROUTE_USER_PROFILE } from "@constants/routes";

import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";

import RolesDialog from "@tools/components/RolesDialog";
import EntitiesDialog from "@tools/components/EntitiesDialog";

import * as yup from "yup";

import "./Register.scss";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from '@material-ui/core/styles';

const defaultRoleControlConfig = { scope: ROLE_LEVEL_NOT_APPLICABLE, sectors: [], LHINs: [], organizations: [] };

const registerSchema = yup.object().shape({
});

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LoginLinkButton = () => (
  <Link to={ROUTE_PUBLIC_LOGIN}>
    <Button className="register__button" fullWidth>Back to login</Button>
  </Link>
);

const BackLinkButton = () => (
    <Link to={ROUTE_PUBLIC_REGISTER_STEP2}>
      <Button className="register__button" fullWidth>Back</Button>
    </Link>
);

const RegisterForm = ({ handleSubmit, searchType, handleChangeSearchType, userOrganization, handleOrganizationChange, userProgram, handleProgramChange, handleOpenOrganizationsDialog, handleOpenProgramsDialog }) => (
  <form className="register__form" onSubmit={handleSubmit}>
    <h1>Registration Step 3</h1>
    <FormLabel component="legend">Enter User Permission</FormLabel>

    <Select
      labelId="searchType"
      id="searchType"
      name="searchType"
      value={searchType}
      onChange={handleChangeSearchType}
      labelWidth={1}
    >
      <MenuItem value="Organization Code">Organization Code</MenuItem>
      <MenuItem value="Organization Name">Organization Name</MenuItem>
      <MenuItem value="Location Name">Location Name</MenuItem>
    </Select>

    <Button className="register__button" color="secondary" variant="contained" onClick={handleOpenOrganizationsDialog} fullWidth>Set Organizations</Button>
    <Button className="register__button" color="secondary" variant="contained" onClick={  handleOpenProgramsDialog} fullWidth>Set Programs</Button>
    <Button className="register__button" variant="contained" color="primary" type="submit">Complete Registration</Button>
    <BackLinkButton/>
    <LoginLinkButton/>
  </form>
);

const RegisterFormContainer = (props) => {
  const [ isRolesDialogOpen, setIsRolesDialogOpen ] = useState(false);
  const [ searchType, setSearchType] = useState("")
  const [ isOrganizationsDialogOpen, setIsOrganizationsDialogOpen ] = useState(false);
  const [ isProgramsDialogOpen, setIsProgramsDialogOpen ] = useState(false);

  const [ organizations, setOrganizations ] = useState([]);
  const [ programs, setPrograms ] = useState([]);
  const [ userOrganizations, setUserOrganizations ] = useState([]);
  const [ userPrograms, setUserPrograms ] = useState([]);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const classes = useStyles();

  const { values: { organizations: userOrganizationsMap, roles }, setFieldValue } = props;

  const handleOpenOrganizationsDialog = () => {
    setIsOrganizationsDialogOpen(true);

    publicAxios.get(`${REST_PUBLIC_DATA}/organizations`)
      .then(({ data: { data: { organizations } } }) => {
        setOrganizations(organizations);
        setUserOrganizations(Object.keys(userOrganizationsMap).map((_id) => ({ ...userOrganizationsMap[_id], _id })));
      })
      .catch((error) => console.error(error));
  };

  const handleCloseOrganizationsDialog = () => {
    if(isOrganizationsDialogOpen) setIsOrganizationsDialogOpen(false);
    if(organizations) setOrganizations([]);
    if(userOrganizations) setUserOrganizations([]);
  };

  const handleAddOrganization = (newUserOrganization) => {
    const { _id } = newUserOrganization;

    if(userOrganizationsMap[_id]) {
      console.error("User is already a part of the selected organization");
    } else {
      let newUserOrganizationsMap = { ...userOrganizationsMap };
      newUserOrganizationsMap[_id] = { ...newUserOrganization, _id: undefined };

      setUserOrganizations([ ...userOrganizations, newUserOrganization ]);
      setFieldValue("organizations", newUserOrganizationsMap);
    }
  };

  const handleDeleteUserOrganization = (userOrganization) => {
    const userOrganizationIndex = userOrganizations.indexOf(userOrganization);

    const newUserOrganizations = [ ...userOrganizations.slice(0, userOrganizationIndex), ...userOrganizations.slice(userOrganizationIndex + 1) ];

    let newUserOrganizationsMap = { ...userOrganizationsMap };
    delete newUserOrganizationsMap[userOrganization._id];

    setFieldValue("organizations", newUserOrganizationsMap);
    setUserOrganizations(newUserOrganizations);
  };

  const handleOpenProgramsDialog = () => {
    setIsProgramsDialogOpen(true);

    publicAxios.get(`${REST_PUBLIC_DATA}/organizations`)
      .then(({ data: { data: { organizations } } }) => {
        let programs= organizations;
        setPrograms(programs);
        setUserPrograms(Object.keys(userOrganizationsMap).map((_id) => ({ ...userOrganizationsMap[_id], _id })));
      })
      .catch((error) => console.error(error));
  };

  const handleCloseProgramsDialog = () => {
    if(isProgramsDialogOpen) setIsProgramsDialogOpen(false);
    if(programs) setPrograms([]);
    if(userPrograms) setUserPrograms([]);
  };

  const handleAddProgram = (newUserProgram) => {
    const { _id } = newUserProgram;

    if(userOrganizationsMap[_id]) {
      console.error("User is already a part of the selected organization");
    } else {
      let newUserProgramsMap = { ...userOrganizationsMap };
      newUserProgramsMap[_id] = { ...newUserProgram, _id: undefined };

      setUserPrograms([ ...userPrograms, newUserProgram ]);
      setFieldValue("organizations", newUserProgramsMap);
    }
  };

  const handleDeleteUserProgram = (userProgram) => {
    const userProgramIndex = userPrograms.indexOf(userProgram);

    const newUserPrograms = [ ...userPrograms.slice(0, userProgramIndex), ...userOrganizations.slice(userProgramIndex + 1) ];

    let newUserProgramsMap = { ...userOrganizationsMap };
    delete newUserProgramsMap[userProgram._id];

    setFieldValue("organizations", newUserProgramsMap);
    setUserPrograms(newUserPrograms);
  };

  const handleChangeSearchType = (event) => {
    setSearchType(event.target.value);
  }

  return (
    <div>
      <h1>Registration Step 3</h1>
      <FormLabel component="legend">Enter User Permission</FormLabel>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          name="searchType"
          value={searchType}
          onChange={handleChangeSearchType}
          labelWidth={labelWidth}
        >
          <MenuItem value="Organization Code">Organization Code</MenuItem>
          <MenuItem value="Organization Name">Organization Name</MenuItem>
          <MenuItem value="Location Name">Location Name</MenuItem>
        </Select>
      </FormControl>

      <Button className="register__button" variant="contained" color="primary" type="submit">Complete Registration</Button>
      <BackLinkButton/>
      <LoginLinkButton/>
      <EntitiesDialog
         open={isOrganizationsDialogOpen}
         userEntities={userOrganizations} 
         entities={organizations} 
         title="Organizations"
         userTitle="Current Organizations"
         allTitle="Add User Organization"
         userSearchPlaceholder="Search User Organizations..."
         allSearchPlaceHolder="Search organizations..."
         handleClose={handleCloseOrganizationsDialog} 
         handleAddEntity={handleAddOrganization} 
         handleDeleteUserEntity={handleDeleteUserOrganization}
      />
      <EntitiesDialog
        open={isProgramsDialogOpen}
        userEntities={userPrograms}
        entities={programs}
        title="Programs"
        userTitle="Current Programs"
        allTitle="Add User Programs"
        userSearchPlaceholder="Search User Programs..."
        allSearchPlaceHolder="Search Programs..."
        handleClose={handleCloseProgramsDialog}
        handleAddEntity={handleAddProgram}
        handleDeleteUserEntity={handleDeleteUserProgram}
      />
    </div>
  );
};

const RegisterView = ({ visisble, initialValues, handleRegister }) => (
  <Slide direction="right" in={visisble} appear={false} mountOnEnter unmountOnExit>
    <Paper className="register__container">
      <Formik validationSchema={registerSchema} initialValues={initialValues} onSubmit={handleRegister} component={RegisterFormContainer}/>
    </Paper>
  </Slide>
);

const ReturnButtons = ({ handleReturnToRegister, handleReturnToLogin }) => (
  <ButtonGroup fullWidth>
    <Button onClick={handleReturnToRegister}>Go Back</Button>
    <Button onClick={handleReturnToLogin}>Login</Button>
  </ButtonGroup>
);

const EmailVerification = ({ registrationData: { email }, visisble, handleReturnToRegister, handleReturnToLogin }) => (
  <Slide direction="left" in={visisble} mountOnEnter unmountOnExit>
    <Paper className="emailVerification">
      <p>An email has been sent to {email}</p>
      <ReturnButtons handleReturnToRegister={handleReturnToRegister} handleReturnToLogin={handleReturnToLogin}/>
    </Paper>
  </Slide>
);

const mapStateToProps = ({ app: { isOnline } }) => ({ isOnline });

let Register = ({ isOnline, history }) => {
  const [ registerView, setRegisterView ] = useState(true);
  const [ registrationData, setRegistrationData ] = useState({ 
    username: "sampleuser", 
    email: "e@ontario.ca", 
    firstName: "", 
    lastName: "", 
    phoneNumber: "", 
    password: "password123@", 
    passwordConfirm: "password123@",
    roles: {
      TEMPLATE_MANAGER: { ...defaultRoleControlConfig }, 
      BUNDLE_MANAGER: { ...defaultRoleControlConfig }, 
      USER_MANAGER: { ...defaultRoleControlConfig }, 
      ORGANIZATION_MANAGER: { ...defaultRoleControlConfig }, 
      LHIN_MANAGER: { ...defaultRoleControlConfig }, 
      SECTOR_MANAGER: { ...defaultRoleControlConfig }, 
      SYSTEM_MANAGER: { ...defaultRoleControlConfig }
    },
    organizations: {}
  });

  const handleRegister = (newUser, { setSubmitting, setErrors }) => {
    if(isOnline) {
      history.push(ROUTE_USER_PROFILE);
    } else {
      if(registerView) {
        publicAxios.post(REST_PUBLIC_REGISTER, { ...newUser, passwordConfirm: undefined })
          .then(() => {
            setRegisterView(false);
            setRegistrationData(newUser);
          })
          .catch(({ response: { data: { message, error } } }) => {
            console.error(message);
            setErrors(error ? error : {});
          })
          .finally(() => setSubmitting(false));
      }
    }
  };
  
  const handleReturnToRegister = () => setRegisterView(true);
  const handleReturnToLogin = () => history.push(ROUTE_PUBLIC_LOGIN);

  return (
    <div className="register">
      <RegisterView initialValues={registrationData} visisble={registerView} handleRegister={handleRegister}/>
      <EmailVerification registrationData={registrationData} visisble={!registerView} handleReturnToRegister={handleReturnToRegister} handleReturnToLogin={handleReturnToLogin}/>
    </div>
  ); 
};

Register = connect(mapStateToProps)(Register);

export default Register;