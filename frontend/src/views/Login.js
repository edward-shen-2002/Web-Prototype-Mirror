import React from "react"

import { Link } from "react-router-dom";

import { Button, Paper, TextField } from "@material-ui/core";

import { Formik } from "formik";

import { publicAxios } from "tools/rest";

import { ROUTE_REGISTER } from "constants/routes";

import "./Login.scss";

const RegisterButton = () => (
  <Link to={ROUTE_REGISTER}>
    <Button className="loginButtonsMain__button loginButtonsMain__register" variant="contained" color="primary">Register</Button>
  </Link>
);

const MainButtons = () => (
  <div className="loginButtonsMain">
    <Button className="loginButtonsMain__button loginButtonsMain__login" variant="contained" color="primary" type="submit">Login</Button>
    <RegisterButton/>
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
    {({ handleSubmit, handleChange, values }) => (
      <Paper className="login__container">
        <form className="login__form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p className="text-muted">Sign In to your account</p>
          <TextField className="login__field" label="Username" id="username" name="username" type="username" autoComplete="username" autoFocus={true} value={values.username} onChange={handleChange}/>
          <TextField className="login__field" label="Password" id="password" name="password" type="password" autoComplete="current-password" autoFocus={true} value={values.password} onChange={handleChange}/>
          <LoginButtons/>
        </form>
      </Paper>
    )}
  </Formik>
);


// const loginRequest = (dispatch, username, password, setErrors, setSubmitting) => {

// };

const Login = () => {
  const handleLogin = (username, password, setErrors, setSubmitting) => {
    // Check if use is already logged in!
    publicAxios.post("/login", { username, password })
      .then((response) => console.log(response))
      .catch((response) => console.log(response));
  }
  return (
    <div className="login">
      <LoginForm handleLogin={handleLogin}/>
    </div>
  );
};

export default Login;