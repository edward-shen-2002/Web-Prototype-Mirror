import React from "react"

// import { Link } from "react-router-dom";

import { Button, Paper, TextField } from "@material-ui/core";

import { Formik } from "formik";

import "./Login.scss";

const MainButtons = () => (
  <div className="loginButtonsMain">
    <Button className="loginButtonsMain__button loginButtonsMain__login" variant="contained" color="primary" type="submit">Login</Button>
    <Button className="loginButtonsMain__button loginButtonsMain__register" variant="contained" color="primary">Register</Button>
  </div>
);

const LoginButtons = () => (
  <div>
    <Button size="small">Forgot Password?</Button>
    <MainButtons/>
  </div>
);

const LoginForm = ({ handleLogin }) => (
  <Formik
    initialValues={{ username: "", password: "" }}
    onSubmit={({ username, password }, { setSubmitting, setErrors }) => handleLogin(username, password, setErrors, setSubmitting)}
  >
    {({ handleSubmit, handleChange, values, errors }) => {
      // ? Avoid space for username 
      const handleKeyPress = (event) => {
        const SPACE = " ";
        if(event.key === SPACE) event.preventDefault();
      };

      return (
        <Paper className="loginForm__container">
          <form className="loginForm__form" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <p className="text-muted">Sign In to your account</p>
            <TextField className="loginForm__field" label="Username" id="username" name="username" type="username" autoComplete="username" autoFocus={true} value={values.username} onChange={handleChange} onKeyPress={handleKeyPress}/>
            <TextField className="loginForm__field" label="Password" id="password" name="password" type="password" autoComplete="current-password" autoFocus={true} value={values.password} onChange={handleChange}/>
            <LoginButtons/>
          </form>
        </Paper>
      );
    }}
  </Formik>
);


// const loginRequest = (dispatch, username, password, setErrors, setSubmitting) => {

// };

const Login = () => {
  const handleLogin = () => console.log("Submitting");
  return (
    <div className="login">
      <LoginForm handleLogin={handleLogin}/>
    </div>
  );
};

export default Login;