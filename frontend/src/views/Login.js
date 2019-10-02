import React from "react"

// import { Link } from "react-router-dom";

import { Button, Paper, TextField } from "@material-ui/core";

import { Formik } from "formik";

import "./Login.scss";

const LoginForm = ({ handleLogin }) => (
  <Formik
    initialValues={{ username: "", password: "" }}
    onSubmit={({ username, password }, { setSubmitting, setErrors }) => handleLogin(username, password, setErrors, setSubmitting)}
  >
    {({ handleSubmit, handleChange, values, errors }) => {
      // Avoid space for username
      const handleKeyPress = (event) => {
        const SPACE = " ";
        if(event.key === SPACE) event.preventDefault();
      };

      return (
        <form className="loginForm" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p className="text-muted">Sign In to your account</p>
          <TextField label="Username" id="username" name="username" type="username" autoComplete="username" autoFocus={true} value={values.username} onChange={handleChange} onKeyPress={handleKeyPress}/>
          <TextField label="Password" id="password" name="password" type="password" autoComplete="current-password" autoFocus={true} value={values.password} onChange={handleChange}/>
          <Button variant="contained" color="primary" type="submit">Login</Button>
        </form>
      );
    }}
  </Formik>
);


// const loginRequest = (dispatch, username, password, setErrors, setSubmitting) => {

// };

const Login = () => {
  const handleLogin = () => console.log("Submitting");
  return (
    <Paper className="container">
      <LoginForm handleLogin={handleLogin}/>
    </Paper>
  );
};

export default Login;