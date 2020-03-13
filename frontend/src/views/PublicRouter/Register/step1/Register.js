import React, { useState } from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { Formik } from "formik";

import { publicAxios } from "@tools/rest";

import { ROLE_LEVEL_NOT_APPLICABLE } from "@constants/roles";
import { REST_PUBLIC_REGISTER} from "@constants/rest";
import { ROUTE_PUBLIC_REGISTER, ROUTE_PUBLIC_REGISTER_STEP2, ROUTE_PUBLIC_LOGIN, ROUTE_USER_PROFILE } from "@constants/routes";

import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import RolesDialog from "@tools/components/RolesDialog";
import EntitiesDialog from "@tools/components/EntitiesDialog";

import * as yup from "yup";

import "./Register.scss";

const defaultRoleControlConfig = { scope: ROLE_LEVEL_NOT_APPLICABLE, sectors: [], LHINs: [], organizations: [] };

const registerSchema = yup.object().shape({
  username: yup.string()
    .min(4, "Username must be 4 to 20 characters long")
    .max(20, "Username must be 4 to 20 characters long")
    .required("Please enter a username"),
  password: yup.string()
    .min(8, "Password must be between 8 and 25 characters long")
    .max(25, "Password must be between 8 and 25 characters long")
    // .matches(/[^{a-z}{A-Z}{1-9}{ }]+/, "Please enter at least one symbol")
    .required("Please enter a password"),
  passwordConfirm: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  firstName: yup.string()
    .max(100, "Name is too long, please enter an alias or nickname instead"),
  lastName: yup.string()
    .max(100, "Name is too long, please enter an alias or nickname instead"),
  email: yup.string()
    .email("Please enter a valid email")
    .max(254, "Email is too long")
    .required("Please enter your email")
});

const LoginLinkButton = () => (
  <Link to={ROUTE_PUBLIC_LOGIN}>
    <Button className="register__button" fullWidth>Back to login</Button>
  </Link>
);

const NextLinkButton = () => (
    <Link to={ROUTE_PUBLIC_REGISTER_STEP2}>
        <Button className="register__button" fullWidth>Next Step</Button>
    </Link>
);

const BackLinkButton = () => (
    <Link to={ROUTE_PUBLIC_REGISTER}>
      <Button className="register__button" fullWidth>Back</Button>
    </Link>
);

const RegisterForm = ({handleSubmit, organizationGroup, handleOrgGroupChange}) => (
  <form className="register__form" onSubmit={handleSubmit}>
    <h1>Registration Step1</h1>
    <FormControl component="fieldset">
      <FormLabel component="legend">Select your organization group</FormLabel>
      <RadioGroup aria-label="OrgGroup" name="OrgGroup1" defaultValue={organizationGroup} onChange={handleOrgGroupChange}>
        <FormControlLabel value="Health Service Providers" control={<Radio />} label="Health Service Providers" />
        <FormControlLabel value="Local Health Integration Network" control={<Radio />} label="Local Health Integration Network" />
        <FormControlLabel value="Ontario Government" control={<Radio />} label="Ontario Government" />
        <FormControlLabel value="Other User Groups" control={<Radio />} label="Other User Groups" />
      </RadioGroup>
    </FormControl>

    {/*<Button className="register__button" variant="contained" color="primary" type="submit">Complete Registration</Button>*/}
    <BackLinkButton/>
    <NextLinkButton/>
    <LoginLinkButton/>
  </form>
);

const RegisterFormContainer = (props) => {
  const [ organizationGroup, setOrganizationGroup] = useState("Health Service Providers");
  const [ isRolesDialogOpen, setIsRolesDialogOpen ] = useState(false);
  const [ isOrganizationsDialogOpen, setIsOrganizationsDialogOpen ] = useState(false);


  const [ organizations, setOrganizations ] = useState([]);
  const [ userOrganizations, setUserOrganizations ] = useState([]);

  const { values: { organizations: userOrganizationsMap, roles }, setFieldValue } = props;

  const handleOrgGroupChange = event => setOrganizationGroup(event.target.value)

  const handleCloseRolesDialog = () => {
    if(isRolesDialogOpen) setIsRolesDialogOpen(false);
  };

  const handleChangeRoleScope = (role, scope) => {
    let updatedUserRoles = { ...roles };
    updatedUserRoles[role] = { ...updatedUserRoles[role], scope };

    setFieldValue("roles", updatedUserRoles);
  };

  const handleDeleteRoleEntity = (role, entityType, entity) => {
    let updatedUserRoles = { ...roles };

    let newEntities = updatedUserRoles[role][entityType];

    const entityIndex = newEntities.indexOf(entity);

    if(entityIndex < 0) {
      console.error("User entity doesn't exist");
    } else {
      newEntities = [ ...newEntities.slice(0, entityIndex), ...newEntities.slice(entityIndex + 1) ];

      updatedUserRoles[role][entityType] = newEntities;

      setFieldValue("roles", updatedUserRoles);
    }
  };

  const handleAddRoleEntity = (role, entityType, entity) => {
    let updatedUserRoles = { ...roles };

    const entities = updatedUserRoles[role][entityType];

    if(entities.find(({ _id }) => _id === entity._id)) {
      console.error("Role entity already exists");
    } else {
      updatedUserRoles[role][entityType] = [ ...updatedUserRoles[role][entityType], entity ];

      setFieldValue("roles", updatedUserRoles);
    }
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

  return (
    <div>
      <RegisterForm organizationGroup={organizationGroup} handleOrgGroupChange = {handleOrgGroupChange} {...props}/>
      <RolesDialog open={isRolesDialogOpen} userRoles={roles} handleClose={handleCloseRolesDialog} handleChangeRoleScope={handleChangeRoleScope} handleAddRoleEntity={handleAddRoleEntity} handleDeleteRoleEntity={handleDeleteRoleEntity}/>
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

let RegisterStep1 = ({ isOnline, history }) => {
  const [ registerView, setRegisterView ] = useState(true);
  const [ registrationData, setRegistrationData ] = useState({ 
    username: "",
    email: "",
    firstName: "", 
    lastName: "", 
    phoneNumber: "", 
    password: "",
    passwordConfirm: "",
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

RegisterStep1 = connect(mapStateToProps)(RegisterStep1);

export default RegisterStep1;