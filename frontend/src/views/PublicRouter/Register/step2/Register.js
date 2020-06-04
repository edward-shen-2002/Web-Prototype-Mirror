import React, { useState } from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { Formik } from "formik";

import { publicAxios } from "@tools/rest";

import { withRouter } from 'react-router';

import { ROLE_LEVEL_NOT_APPLICABLE } from "@constants/roles";
import { REST_PUBLIC_REGISTER, REST_PUBLIC_DATA } from "@constants/rest";
import { ROUTE_PUBLIC_REGISTER_STEP1, ROUTE_PUBLIC_REGISTER_STEP3, ROUTE_PUBLIC_LOGIN, ROUTE_USER_PROFILE } from "@constants/routes";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import * as yup from "yup";

import "./Register.scss";
import FormLabel from "@material-ui/core/FormLabel";
import Snackbar from "@material-ui/core/Snackbar";
import CustomSnackbarContent from "../../../../tools/components/CustomSnackbarContent/CustomSnackbarContent";

const defaultRoleControlConfig = { scope: ROLE_LEVEL_NOT_APPLICABLE, sectors: [], LHINs: [], organizations: [] };


const registerSchema = yup.object().shape({
  title: yup.string()
    .required("Please select one title"),
  userName: yup.string()
    .min(6, "Username must be 6 to 20 characters long")
    .max(20, "Username must be 6 to 20 characters long")
    .required("Please enter a user name"),
  password: yup.string()
    .min(8, "Password must be between 8 and 25 characters long")
    .max(25, "Password must be between 8 and 25 characters long")
    .matches(/[^{a-z}{A-Z}{0-9}{ }]+/, "Please enter at least one symbol")
    .required("Please enter a password"),
  passwordConfirm: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
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

const LoginLinkButton = () => (
  <Link to={ROUTE_PUBLIC_LOGIN}>
    <Button className="register__button" fullWidth>Back to login</Button>
  </Link>
);

const BackLinkButton = () => (
    <Link to={ROUTE_PUBLIC_REGISTER_STEP1}>
      <Button className="register__button" fullWidth>Back</Button>
    </Link>
);

const RegisterForm = ({values, errors, touched, handleSubmit, handleChange, handleBlur, checkValidation, isSnackbarOpen, handleSnackbarClose}) => (
  <form  className="register__form" onSubmit={handleSubmit}>
    <h1>Registration Step 2</h1>
    <FormLabel component="legend">Enter User Information</FormLabel>
    <FormControl variant="outlined" className="register__field">
      <InputLabel id="demo-simple-select-required-label">*Title</InputLabel>
      <Select
          labelId="title"
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
      >
        <MenuItem value="Mr.">Mr.</MenuItem>
        <MenuItem value="Mrs.">Mrs.</MenuItem>
        <MenuItem value="Ms.">Ms.</MenuItem>
        <MenuItem value="Dr.">Dr.</MenuItem>
      </Select>
    </FormControl>

    <TextField
      variant="outlined"
      className="register__field"
      label="*User Id"
      id="userName"
      name="userName"
      type="userName"
      value={values.userName}
      onChange={handleChange}
      error={touched.userName && !!errors.userName}
      helperText={touched.userName && errors.userName}
      onBlur={handleBlur}
      InputProps={{
        style:{
          height: 45
        }
      }}

    />
    <TextField
      variant="outlined"
      className="register__field"
      label="*Email"
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
          height: 45
        }
      }}
    />
    <TextField
      variant="outlined"
      className="register__field"
      label="*First Name"
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
          height: 45
        }
      }}
    />
    <TextField
      variant="outlined"
      className="register__field"
      label="*Last Name"
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
          height: 45
        }
      }}
    />
    <TextField
      variant="outlined"
      className="register__field"
      label="*Phone Number"
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
          height: 45
        }
      }}
    />
    <TextField
      variant="outlined"
      className="register__field"
      label="*Password"
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
          height: 45
        }
      }}
    />
    <TextField
      variant="outlined"
      className="register__field"
      label="*Confirm Password"
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
          height: 45
        }
      }}
    />

    <TextField
      variant="outlined"
      className="register__field"
      label="Ext."
      id="Ext."
      name="Ext."
      type="Ext."
      value={values.Ext}
      onChange={handleChange}
      onBlur={handleBlur}
      InputProps={{
        style:{
          height: 45
        }
      }}
    />

    {/*<Button className="register__button" variant="contained" color="primary" type="submit">Complete Registration</Button>*/}
    <BackLinkButton/>
    <Button className="register__button" value={registerSchema} onClick={checkValidation} fullWidth>Next Step</Button>
    <LoginLinkButton/>
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
);

let RegisterFormContainer = (props) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const handleTitleChange = () => {};
  const checkValidation = () => {
    registerSchema
      .isValid(props.values)
      .then(function(valid) {
        if(!valid){
          setIsSnackbarOpen(true);
        }
        else props.history.push(ROUTE_PUBLIC_REGISTER_STEP3);
      });
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };
  return (
    <div>
      <RegisterForm handleTitleChange={handleTitleChange} checkValidation={checkValidation} isSnackbarOpen={isSnackbarOpen} handleSnackbarClose={handleSnackbarClose} {...props}/>
    </div>
  );
};

RegisterFormContainer = withRouter(RegisterFormContainer);

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
    title: "",
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

Register = connect(mapStateToProps)(Register);

export default Register;