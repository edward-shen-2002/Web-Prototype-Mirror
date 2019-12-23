import React, { useState } from "react"

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import { Formik } from "formik";

import { loadUserState } from "tools/redux";
import { publicAxios, setAxiosToken } from "tools/rest";
import { saveToken } from "tools/storage";

import { REST_PUBLIC_LOGIN } from "constants/rest";
import { ROUTE_PUBLIC_REGISTER, ROUTE_PUBLIC_RECOVERY, ROUTE_USER_PROFILE } from "constants/routes";

import "./Login.scss";

const RegisterButton = () => (
  <Link to={ROUTE_PUBLIC_REGISTER}>
    <Button className="loginButtonsMain__button loginButtonsMain__register" variant="contained" color="primary">Register</Button>
  </Link>
);

const MainButtons = () => (
  <div className="loginButtonsMain">
    <Button className="loginButtonsMain__button loginButtonsMain__login" variant="contained" color="primary" type="submit">Login</Button>
    <RegisterButton/>
  </div>
);

const RecoveryButton = () => (
  <Link to={ROUTE_PUBLIC_RECOVERY}>
    <Button size="small">Forgot Password?</Button>
  </Link>
);

const LoginButtons = () => (
  <div>
    <RecoveryButton/>
    <MainButtons/>
  </div>
);

const LoginForm = ({ handleLogin, generalError }) => (
  <Formik
    initialValues={{ username: "sampleuser", password: "password123" }}
    onSubmit={(values, { setSubmitting }) => handleLogin(values, setSubmitting)}
  >
    {({ handleSubmit, handleChange, values }) => (
      <Paper className="login__container">
        <form className="login__form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p className="text-muted">Sign In to your account</p>
          <TextField className="login__field" label="Username" id="username" name="username" type="username" autoComplete="username" autoFocus={true} value={values.username} onChange={handleChange}/>
          <TextField className="login__field" label="Password" id="password" name="password" type="password" autoComplete="current-password" value={values.password} onChange={handleChange}/>
          {generalError && <p className="login__error">{generalError}</p>}
          <LoginButtons/>
        </form>
      </Paper>
    )}
  </Formik>
);

const mapStateToProps = ({ isOnline }) => ({ isOnline });

const mapDispatchToProps = (dispatch) => ({
  login: (isOnline, history, { username, password }, setSubmitting, setGeneralError) => {
    if(isOnline) {
      history.push(ROUTE_USER_PROFILE);
    } else {
      publicAxios.post(REST_PUBLIC_LOGIN, { username, password })
        .then(({ data: { data: { token, user } } }) => {
          setAxiosToken(token);
          saveToken(token);
          loadUserState(dispatch, { user });
        })
        .catch(({ response: { data: { general, message } } }) => {
          setGeneralError(general ? general : message);
          setSubmitting(false);
        });
    }
  }
});

let Login = ({ isOnline, history, login }) => {
  const [ generalError, setGeneralError ] = useState("");
  const handleLogin = (values, setSubmitting) => login(isOnline, history, values, setSubmitting, setGeneralError);

  return (
    <div className="login">
      <LoginForm handleLogin={handleLogin} generalError={generalError}/>
    </div>
  );
};

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;