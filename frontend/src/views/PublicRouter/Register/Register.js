import React, {lazy, useState} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { publicAxios } from "@tools/rest";
import { AppNavbarBrand } from "@coreui/react";
import logo from "@images/brand/ON_POS_LOGO_WHITE.svg";
import SRIBar from "@images/brand/SRI.jpg";
import { ROLE_LEVEL_NOT_APPLICABLE } from "@constants/roles";
import { REST_PUBLIC_REGISTER, REST_PUBLIC_DATA } from "@constants/rest";
import { ROUTE_PUBLIC_LOGIN, ROUTE_USER_PROFILE } from "@constants/routes";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from "react-select";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Preregister from "../Preregister";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FilteredMultiSelect from 'react-filtered-multiselect'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';


import "./Register.scss";
import Box from "@material-ui/core/Box";
import * as yup from "yup";
import Snackbar from "@material-ui/core/Snackbar";
import CustomSnackbarContent from "../../../tools/components/CustomSnackbarContent/CustomSnackbarContent";
import uniqid from "uniqid";

const MaterialTable = lazy(() => import("material-table"));

const checkBoxColumns = [
  { title: "Organization", field: "organization" },
  { title: "Program", field: "program" },
  { title: "Submission", field: "submission"},
  { title: "Approve*", field: "approve" ,render: rowData =>
      <Checkbox>
        value={rowData.Approve}
        color="primary"
      </Checkbox>
  },
  { title: "Review**", field: "review" ,render: rowData =>
      <Checkbox>
        value={rowData.Review}
        color="primary"
      </Checkbox>
  },
  { title: "Submit***", field: "submit" ,render: rowData =>
      <Checkbox>
        value={rowData.Submit}
        color="primary"
      </Checkbox>
  },
  { title: "Input****", field: "input" ,render: rowData =>
      <Checkbox>
        value={rowData.Input}
        color="primary"
      </Checkbox>
  },
  { title: "View*****", field: "view" ,render: rowData =>
      <Checkbox>
        value={rowData.View}
        color="primary"
      </Checkbox>
  },
  { title: "View Cognos******", field: "viewCognos" ,render: rowData =>
      <Checkbox>
        value={rowData.ViewCognos}
        color="primary"
      </Checkbox>
  },
]


const columns = [
  { title: "Organization", field: "organization" },
  { title: "Program", field: "program" },
  { title: "Submission", field: "submission" },
  { title: "Permission", field: "permission" },
  { title: "Authoritative Person Name", field: "authoritativePersonName" },
  { title: "Authoritative Person's Phone Number", field: "authoritativePersonPhoneNumber" },
  { title: "Authoritative Person's Email", field: "authoritativePersonEmail" }
];

function getSteps() {
  return ['Step1', 'Step2', 'Step3'];
}

class MySelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange(this.props.name, value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur(this.props.name, true);
  };

  render() {
    return (
      <div className={this.props.className}>
        <Select
          id={this.props.name}
          options={this.props.options}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          name={this.props.name}
          variant="outlined"
        />
        {!!this.props.error &&
        this.props.touched && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
        )}
      </div>
    );
  }
}

const defaultRoleControlConfig = { organizationOptions:[], userOrganization:[], programOptions:[], userProgram:[] };

const registerSchema = yup.object().shape({
  title: yup.string()
    .required("Please select one title"),
  username: yup.string()
    .min(6, "Username must be 6 to 20 characters long")
    .max(20, "Username must be 6 to 20 characters long")
    .required("Please enter a username"),
  password: yup.string()
    .min(8, "The given password is too short. Password must be at least 8 character(s) long")
    .matches(/[{0-9}]/, "Password has too few numeric characters (0-9). The password must have at least 1 numeric character(s)")
    .matches(/[{a-z}{A-Z}}]/, "Password has too few alphabetic characters (A-Z, a-z). The password must have at least 2 alphabetic character(s)")
    .required("Please enter a password"),
  passwordConfirm: yup.string()
    .oneOf([yup.ref("password"), null], "Password should match with Verify Password")
    .required("Please confirm your password"),
  firstName: yup.string()
    .required("Please enter first name")
    .max(100, "Name is too long, please enter an alias or nickname instead"),
  lastName: yup.string()
    .required("Please enter last name")
    .max(100, "Name is too long, please enter an alias or nickname instead"),
  phoneNumber: yup.string()
    .length(10,"Please enter valid phone number")
    .matches(/^[0-9]+$/, "Please enter valid phone number")
    .required("Please enter phone number"),
  email: yup.string()
    .email("Please enter a valid email")
    .max(254, "Email is too long")
    .required("Please enter your email"),
  ext: yup.string()
    .max(100, "Ext is too long"),
});

const Header = () => (
  <div className="header__container">
    <div className="header__bgnd">
      <img src={SRIBar} className="header__logoBar"/>
      <img src={logo} height={48} alt="MOH Logo" className="header__logo"/>
    </div>
  </div>
)

const actions=[
  {
    icon: 'delete',
    tooltip: 'Delete Permission',
    onClick: (event, rowData) => {
      rowData.organization= "";
      rowData.program="";
    }
  }
]


const getStepContent = (steps, activeStep, organizationGroup, handleOrgGroupChange, isSnackbarOpen, setIsSnackbarOpen, handleBack, handleNext, handleSubmit, handleSnackbarClose,
                        userOrganizations, organizationOptions, handleOrgChange, titleOptions, handleTitleChange, handleProgramChange, props) => {

  const { values, handleChange, touched, handleBlur, errors, setFieldValue, setFieldTouched} = props
  switch (activeStep) {
    case 0:
      return (
        <>
          <Box border={1} color="primary" className="register__box" justifyContent="center">
            <FormControl component="fieldset" className="register__selection">
              <FormLabel className="register__title" component="legend">Step1: Select your Organization Group</FormLabel>
              <RadioGroup aria-label="OrgGroup" name="OrgGroup1" defaultValue={organizationGroup} onChange={handleOrgGroupChange}>
                <FormControlLabel value="Health Service Providers" control={<Radio />} label="Health Service Providers" />
                <FormControlLabel value="Local Health Integration Network" control={<Radio />} label="Local Health Integration Network" />
                <FormControlLabel value="Ontario Government" control={<Radio />} label="Ontario Government" />
                <FormControlLabel value="Other User Groups" control={<Radio />} label="Other User Groups" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box border={1} color="primary" className="register__buttonBox" justifyContent="center">
            <Button disabled={activeStep === 0} variant="outlined" color="primary" className="register__buttonBack" onClick={handleBack} >
              Back
            </Button>

            <Button variant="outlined" color="primary" className="register__button"  href={ROUTE_PUBLIC_LOGIN} >
              Cancel
            </Button>

            <Button variant="outlined" color="primary" className="register__button"  onClick={handleNext} >
              Next
            </Button>

            <Button disabled={activeStep !== 2} variant="outlined" color="primary" className="register__button"  onClick={handleSubmit} >
              COMPLETE REGISTRATION
            </Button>
          </Box>
        </>
      );
    case 1:
      return (
        <>
          <form className="register__form">
            <FormLabel className="register__title" component="legend">Step2: Enter User Information</FormLabel>
            <div className="register__label">
              <Typography className="register__inputTitle"> *Title </Typography>
            </div>
            <div className="register__informationField">
              <MySelect
                name = "title"
                options = {titleOptions}
                value={values.title}
                onChange={setFieldValue}
                className="register__selectTitle"
                onBlur={setFieldTouched}
              />
            </div>
            <div className="register__label">
              <Typography className="register__inputTitle"> *Last Name </Typography>
            </div>
            <div className="register__informationField">
              <TextField
                variant="outlined"
                className="register__field"
                id="lastName"
                name="lastName"
                type="text"
                value={values.lastName}
                onChange={handleChange}
                error={touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                onBlur={handleBlur}
                InputProps={{
                  style:{
                    height: 30
                  }
                }}
              />
            </div>
            <div className="register__label">
             <Typography className="register__inputTitle"> *First Name </Typography>
            </div>
            <div className="register__informationField">
              <TextField
                variant="outlined"
                className="register__field"
                id="firstName"
                name="firstName"
                type="text"
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                onBlur={handleBlur}
                InputProps={{
                  style:{
                    height: 30
                  }
                }}
              />
            </div>

            <br/>
            <div className="register__label">
             <Typography className="register__inputTitle"> *Phone Number </Typography>
            </div>
            <div className="register__informationField">
              <TextField
                variant="outlined"
                className="register__field"
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={values.phoneNumber}
                onChange={handleChange}
                error={touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                onBlur={handleBlur}
                InputProps={{
                  style:{
                    height: 30
                  }
                }}
              />
            </div>
            <div className="register__label">
             <Typography className="register__inputTitle"> Ext. </Typography>
            </div>
            <div className="register__informationField">
              <TextField
                variant="outlined"
                className="register__field"
                id="Ext."
                name="Ext."
                type="Ext."
                value={values.ext}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  style:{
                    height: 30
                  }
                }}
              />
            </div>
            <br/>
            <div className="register__label">
             <Typography className="register__inputTitle"> *Email </Typography>
            </div>
            <div className="register__informationField">
              <TextField
                variant="outlined"
                className="register__field"
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                onBlur={handleBlur}
                InputProps={{
                  style:{
                    height: 30
                  }
                }}
              />
            </div>
            <br/>
            <div className="register__label">
             <Typography className="register__inputTitle"> *User ID </Typography>
            </div>
            <div className="register__informationField">
              <TextField
                variant="outlined"
                className="register__field"
                id="username"
                name="username"
                type="username"
                value={values.username}
                onChange={handleChange}
                error={touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                onBlur={handleBlur}
                InputProps={{
                  style:{
                    height: 30
                  }
                }}
              />
            </div>
            <br/>
            <div className="register__label">
             <Typography className="register__inputTitle"> *Password </Typography>
            </div>
            <div className="register__informationField">
              <TextField
                variant="outlined"
                className="register__field"
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                onBlur={handleBlur}
                InputProps={{
                  style:{
                    height: 30
                  }
                }}
              />
            </div>
            <br/>
            <div className="register__label">
             <Typography className="register__inputTitle"> *Confirm Password </Typography>
            </div>
            <div className="register__informationField">
              <TextField
                variant="outlined"
                className="register__field"
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                value={values.passwordConfirm}
                onChange={handleChange}
                error={touched.passwordConfirm && !!errors.passwordConfirm}
                helperText={touched.passwordConfirm && errors.passwordConfirm}
                onBlur={handleBlur}
                InputProps={{
                  style:{
                    height: 30
                  }
                }}
              />
            </div>
            <br/>
            {/*<Button className="register__button" variant="contained" color="primary" type="submit">Complete Registration</Button>*/}
            <Box border={1} color="primary" className="register__buttonBox" justifyContent="center">
              <Button disabled={activeStep === 0} variant="outlined" color="primary" className="register__buttonBack" onClick={handleBack} >
                Back
              </Button>

              <Button variant="outlined" color="primary" className="register__button"  href={ROUTE_PUBLIC_LOGIN} >
                Cancel
              </Button>

              <Button variant="outlined" color="primary" className="register__button"
                onClick={ ()=>{
                  registerSchema
                  .isValid(values)
                  .then(function(valid) {
                    if(!valid){
                      setIsSnackbarOpen(true);
                    }
                    else handleNext();
                  });
                } }
               >
                Next
              </Button>

              <Button disabled={activeStep !== 2} variant="outlined" color="primary" className="register__button"  onClick={handleSubmit} >
                COMPLETE REGISTRATION
              </Button>
            </Box>

            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={isSnackbarOpen}
              autoHideDuration={6000}
              color="primary"
              onClose={handleSnackbarClose}
            >
              <CustomSnackbarContent
                onClose={handleSnackbarClose}
                variant="error"
                message="Information Required"
              />
            </Snackbar>
          </form>
        </>
      );
    case 2:
      let userOrgCode = "";
      return (
        <div className="register__form">
          <Typography className="register__inputTitle"> *Organizations </Typography>
          <MySelect
            name = "organizations"
            options = {organizationOptions}
            value={values.organization}
            onChange={setFieldValue}
            className="register__select"
            onBlur={setFieldTouched}
          />
          <Typography className="register__inputTitle"> *Program </Typography>

          <FilteredMultiSelect
            onChange={handleProgramChange}
            options={organizationOptions}
            selectedOptions={values.programs}
            textProp="label"
            valueProp="value"
            buttonText="Add Program"
            className="register__filteredMultiSelect"
            showFilter={false}
            classNames={{
              button: "register__step3Button",
              select: "register__multiSelect",
            }}
          />

          <div className="register__tableContainer">
            <MaterialTable
              className="register__table"
              columns={checkBoxColumns}
              options={{
                toolbar : false,
                showTitle: false,
                headerStyle: {
                  backgroundColor: "#f2f5f7"
                }
              }}
              style={{
                backgroundColor: "#f2f5f7"
              }}
              data={[
                { organization: 'MOH', program: 'Hosipital1', Approve: false, Review: false, Input: false, Submit: false, View: false, ViewCognos: false },
                { organization: 'MOH', surname: 'Hosipital2', Approve: false, Review: false, Input: false, Submit: false, View: false, ViewCognos: false  },
              ]}
              // editable={editable} options={options}
            />
          </div>
          <Button variant="outlined" color="primary" className="register__step3Button"  onClick={handleProgramChange} >
            Add Submission
          </Button>
          <div className="register__tableContainer">
            <MaterialTable
              className="register__table"
              columns={columns}
              options={{
                toolbar : false,
                showTitle: false,
                headerStyle: {
                  backgroundColor: "#f2f5f7"
                }
              }}
              style={{
                backgroundColor: "#f2f5f7"
              }}
              actions={[
                {
                  icon: 'delete',
                  tooltip: 'Delete Permission',
                  onClick: (event, rowData) => {
                    rowData.organization= "";
                    rowData.program="";
                  }
                }
              ]}
              components={{
                Action: props => (
                  <Button
                    onClick={(event) => props.action.onClick(event, props.data)}
                    color="primary"
                    variant="outlined"
                    style={{textTransform: 'none'}}
                    size="small"
                  >
                    Delete
                  </Button>
                )
              }}
              data={[
                { organization: 'MOH', program: 'Hospital1'},
                { organization: 'MOH', program: 'Hospital2'},
              ]}
              // editable={editable} options={options}
            />
          </div>

        </div>
    );
    default:
      return (
        <Typography >
          Select campaign settings...
        </Typography>);
  }
}

let Register = ({ isOnline, history }) => {

  const [ registrationData, setRegistrationData ] = useState({
    title: "Mr.",
    username: "Haonan",
    email: "sampleUser@ontario.ca",
    firstName: "Haonan",
    lastName: "Sun",
    phoneNumber: "1234567890",
    password: "123qweASD",
    passwordConfirm: "123qweASD",
    ext: "111",
    organizations: {},
    programs: []
  });

  //
  // const handleOrgGroupChange = event => setOrganizationGroup(event.target.value);
  // const handleUserTitleChange = event => setUserTitle(event.target.value);
  // const handleUserPhoneNumberChange = event => setUserPhoneNumber(event.target.value);
  // const handleUserEmailChange = event => setUserEmail(event.target.value);
  // const handleUserIDChange = event => setUserID(event.target.value);
  // const handlePasswordChange = event => setPassword(event.target.value);
  // const handleLastNameChange = event => setLastName(event.target.value);
  // const handleFirstNameChange = event => setFirstName(event.target.value);
  // const handleExtChange = event => setExt(event.target.value);

  const handleRegister = () => {

  };

  return (
    <>
      <Header/>
      <div className="register">

        <br/>
        <Paper className="register__container" >
          <Formik validationSchema={registerSchema} initialValues={registrationData} onSubmit={handleRegister} component={Register_container}/>
        </Paper>
      </div>
    </>
  );

}

const Register_container = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [ organizationGroup, setOrganizationGroup] = useState("Health Service Providers");
  const [ userTitle, setUserTitle] = useState("");
  const [ userPhoneNumber, setUserPhoneNumber] = useState("");
  const [ userEmail, setUserEmail] = useState("");
  const [ userID, setUserID] = useState("");
  const [ password, setPassword] = useState("");
  const [ lastName, setLastName] = useState("");
  const [ firstName, setFirstName] = useState("");
  const [ Ext, setExt] = useState("");
  const [ isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const steps = getSteps();
  const [ organizationOptions, setOrganizationOptions ] = useState([]);
  const [ ProgramOptions, setProgramOptions ] = useState([]);
  const [ userOrganizations, setUserOrganizations ] = useState([]);
  const [ userPrograms, setUserPrograms ] = useState([]);


  const { values: { organizations: userOrganizationsMap, programs: userProgramsMap}, setFieldValue } = props;

  const titleOptions = [
    {label: "Mr.", value: "Mr."},
    {label: "Mrs.", value: "Mrs."},
    {label: "Ms.", value: "Ms."},
    {label: "Dr.", value: "Dr."}
  ]


  const handleNext = () => {
    if (activeStep === 0) {
      publicAxios.get(`${REST_PUBLIC_DATA}/organizations`)
        .then(({data: {data: {organizations}}}) => {
          let options = []
          organizations.forEach(org => {
            options.push({label: org.name, value: org.code});
          });
          setOrganizationOptions(options);
          setUserOrganizations(Object.keys(userOrganizationsMap).map((_id) => ({...userOrganizationsMap[_id], _id})));
        })
        .catch((error) => console.error(error));

      // publicAxios.get(`${REST_PUBLIC_DATA}/programs`)
      //   .then(({data: {data: {organizations}}}) => {
      //     let options = []
      //     organizations.forEach(org => {
      //       options.push({label: org.name, value: org.code});
      //     });
      //     setOrganizationOptions(options);
      //     setUserOrganizations(Object.keys(userOrganizationsMap).map((_id) => ({...userOrganizationsMap[_id], _id})));
      //   })
      //   .catch((error) => console.error(error));
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);

  };

  const handleRowDelete = (oldOrganization) => new Promise((resolve, reject) => {

  });

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSubmit = () => {

  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const handleOrgChange = event => {
    console.log(event);
    setUserOrganizations(event.target.value);

  }

  const handleTitleChange = event => props.values.title = event.target.value;

  const handleOrgGroupChange = event => setOrganizationGroup(event.target.value);

  const handleProgramChange = event => props.values.program = event.target.selectedOptions;

  return (
     <div>
       <Stepper className="register__stepper" activeStep={activeStep}>
        {steps.map((label, index) => {

          return (
            <Step key={label} >
              <StepLabel >{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography >
              All steps completed - you&apos;re finished
            </Typography>
          </div>
        ) : (
          <div>
            {getStepContent(steps, activeStep, organizationGroup, handleOrgGroupChange, isSnackbarOpen, setIsSnackbarOpen, handleBack, handleNext, handleSubmit, handleSnackbarClose,
              userOrganizations, organizationOptions, handleOrgChange, titleOptions, handleTitleChange, handleProgramChange, props)}
          </div>
        )}
      </div>
     </div>
  );
}

export default Register;