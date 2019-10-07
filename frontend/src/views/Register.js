import React from "react";

import { Link } from "react-router-dom";

import { Formik } from "formik";

import { Paper, TextField, Button } from "@material-ui/core";

import { publicAxios } from "tools/rest";

import { ROUTE_LOGIN } from "constants/routes";

import "./Register.scss";

const LoginLinkButton = () => (
  <Link to={ROUTE_LOGIN}>
    <Button className="register__button" fullWidth>Back to login</Button>
  </Link>
);

const RegisterForm = ({ handleRegister }) => {

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={({ username, password }, { setSubmitting, setErrors }) => handleRegister(username, password, setErrors, setSubmitting)}
    >
      {({ handleSubmit, handleChange, values }) => (
        <Paper className="register__container">
          <form className="register__form" onSubmit={handleSubmit}>
            <h1>Register</h1>
            <TextField className="register__field" label="Username" id="username" name="username" type="username" autoComplete="username" autoFocus={true} value={values.username} onChange={handleChange}/>
            <TextField className="register__field" label="Password" id="password" name="password" type="password" autoComplete="current-password" autoFocus={true} value={values.password} onChange={handleChange}/>
            <Button className="register__button" variant="contained" color="primary" type="submit">Register</Button>
            <LoginLinkButton/>
          </form>
        </Paper>
      )}
    </Formik>
  );
};

const Register = () => {
  const handleRegister = (username, password, setErrors, setSubmitting) => {
    // Check if use is already logged in!
    publicAxios.post("/register", { username, password })
      .then((response) => console.log(response))
      .catch((response) => console.log(response)); 
  };

  return (
    <div className="register">
      <RegisterForm handleRegister={handleRegister}/>
    </div>
  ); 
}

export default Register