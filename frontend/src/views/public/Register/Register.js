import React, { useState } from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { Formik } from "formik";

import { publicAxios } from "tools/rest";

import { ROLE_LEVEL_NOT_APPLICABLE } from "constants/roles";
import { REST_PUBLIC_REGISTER } from "constants/rest";
import { ROUTE_LOGIN, ROUTE_DASHBOARD } from "constants/routes";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";

import RolesDialog from "tools/components/RolesDialog";

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
  <Link to={ROUTE_LOGIN}>
    <Button className="register__button" fullWidth>Back to login</Button>
  </Link>
);

const RegisterForm = ({ values, errors, touched, handleSubmit, handleChange, handleBlur, handleOpenRolesDialog }) => (
  <form className="register__form" onSubmit={handleSubmit}>
    <h1>Register</h1>
    <TextField 
      className="register__field" 
      label="*Username" 
      id="username" 
      name="username" 
      type="username" 
      autoFocus={true} 
      value={values.username} 
      onChange={handleChange} 
      error={touched.username && !!errors.username} 
      helperText={touched.username && errors.username}
      onBlur={handleBlur}
    />
    <TextField 
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
    />
    <TextField 
      className="register__field" 
      label="First Name" 
      id="firstName" 
      name="firstName" 
      type="text" 
      value={values.firstName} 
      onChange={handleChange} 
      error={touched.firstName && !!errors.firstName} 
      helperText={touched.firstName && errors.firstName}
      onBlur={handleBlur}
    />
    <TextField 
      className="register__field" 
      label="Last Name" 
      id="lastName" 
      name="lastName" 
      type="text" 
      value={values.lastName} 
      onChange={handleChange} 
      error={touched.lastName && !!errors.lastName} 
      helperText={touched.lastName && errors.lastName}
      onBlur={handleBlur}
    />
    <TextField 
      className="register__field" 
      label="Phone Number" 
      id="phoneNumber" 
      name="phoneNumber" 
      type="tel" 
      value={values.phoneNumber} 
      onChange={handleChange} 
      error={touched.phoneNumber && !!errors.phoneNumber} 
      helperText={touched.phoneNumber && errors.phoneNumber}
      onBlur={handleBlur}
      />
    <TextField 
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
      />
    <TextField 
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
    />
    <Button color="secondary" variant="contained" onClick={handleOpenRolesDialog} fullWidth>Set Roles</Button>
    <Button className="register__button" variant="contained" color="primary" type="submit">Register</Button>
    <LoginLinkButton/>
  </form>
);

const RegisterFormContainer = (props) => {
  const { values: { roles }, setFieldValue, handleChange } = props;

  const [ isRolesDialogOpen, setIsRolesDialogOpen ] = useState(false);

  const handleOpenRolesDialog = () => {
    setIsRolesDialogOpen(true);
  };

  const handleCloseRolesDialog = () => {
    if(isRolesDialogOpen) setIsRolesDialogOpen(false);
  };

  const handleChangeRoleScope = (role, scope) => {
    let updatedUserRoles = { ...roles };
    updatedUserRoles[role] = { ...updatedUserRoles[role], scope };

    // handleChange()

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

  return (
    <div>
      <RegisterForm handleOpenRolesDialog={handleOpenRolesDialog} {...props}/>
      <RolesDialog open={isRolesDialogOpen} userRoles={roles} handleClose={handleCloseRolesDialog} handleChangeRoleScope={handleChangeRoleScope} handleAddRoleEntity={handleAddRoleEntity} handleDeleteRoleEntity={handleDeleteRoleEntity}/>
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
      PACKAGE_MANAGER: { ...defaultRoleControlConfig }, 
      USER_MANAGER: { ...defaultRoleControlConfig }, 
      ORGANIZATION_MANAGER: { ...defaultRoleControlConfig }, 
      LHIN_MANAGER: { ...defaultRoleControlConfig }, 
      SECTOR_MANAGER: { ...defaultRoleControlConfig }, 
      SYSTEM_MANAGER: { ...defaultRoleControlConfig }
    }
  });

  const handleRegister = (newUser, { setSubmitting, setErrors }) => {
    if(isOnline) {
      history.push(ROUTE_DASHBOARD);
    } else {
      if(registerView) {
        publicAxios.post(REST_PUBLIC_REGISTER, { ...newUser, passwordConfirm: undefined })
          .then(() => {
            setRegisterView(false);
            setRegistrationData(newUser);
          })
          .catch(({ response: { data: { error } } }) => setErrors(error))
          .finally(() => setSubmitting(false));
      }
    }
  };
  
  const handleReturnToRegister = () => setRegisterView(true);
  const handleReturnToLogin = () => history.push(ROUTE_LOGIN);

  return (
    <div className="register">
      <RegisterView initialValues={registrationData} visisble={registerView} handleRegister={handleRegister}/>
      <EmailVerification registrationData={registrationData} visisble={!registerView} handleReturnToRegister={handleReturnToRegister} handleReturnToLogin={handleReturnToLogin}/>
    </div>
  ); 
};

Register = connect(mapStateToProps)(Register);

export default Register;