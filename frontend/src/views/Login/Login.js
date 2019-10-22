import React from "react"

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { Button, Paper, TextField } from "@material-ui/core";

import { Formik } from "formik";

import { loadUserState } from "tools/redux";
import { publicAxios, setAxiosToken } from "tools/rest";
import { saveToken } from "tools/storage";

import { REST_LOGIN } from "constants/rest";
import { ROUTE_REGISTER, ROUTE_RECOVERY, ROUTE_DASHBOARD } from "constants/routes";

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

const RecoveryButton = () => (
  <Link to={ROUTE_RECOVERY}>
    <Button size="small">Forgot Password?</Button>
  </Link>
);

const LoginButtons = () => (
  <div>
    <RecoveryButton/>
    <MainButtons/>
  </div>
);

const LoginForm = ({ handleLogin }) => (
  <Formik
    initialValues={{ username: "sampleuser", password: "password123" }}
    onSubmit={(values, { setSubmitting, setErrors }) => handleLogin(values, setErrors, setSubmitting)}
  >
    {({ handleSubmit, handleChange, values }) => (
      <Paper className="login__container">
        <form className="login__form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p className="text-muted">Sign In to your account</p>
          <TextField className="login__field" label="Username" id="username" name="username" type="username" autoComplete="username" autoFocus={true} value={values.username} onChange={handleChange}/>
          <TextField className="login__field" label="Password" id="password" name="password" type="password" autoComplete="current-password" value={values.password} onChange={handleChange}/>
          <LoginButtons/>
        </form>
      </Paper>
    )}
  </Formik>
);

const mapStateToProps = ({ isOnline }) => ({ isOnline });

const mapDispatchToProps = (dispatch) => ({
  login: (isOnline, history, { username, password }, _setErrors, setSubmitting) => {
    if(isOnline) {
      history.push(ROUTE_DASHBOARD);
    } else {
      publicAxios.post(REST_LOGIN, { username, password })
        .then(({ data: { data: { token, user } } }) => {
          setAxiosToken(token);
          saveToken(token);
          loadUserState(dispatch, { user });
        })
        .catch(() => setSubmitting(false));
    }
  }
});

let Login = ({ isOnline, history, login }) => {
  const handleLogin = (values, setErrors, setSubmitting) => login(isOnline, history, values, setErrors, setSubmitting);

  return (
    <div className="login">
      <LoginForm handleLogin={handleLogin}/>
    </div>
  );
};

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;