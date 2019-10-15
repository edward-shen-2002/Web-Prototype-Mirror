import React from "react";

import { Link } from "react-router-dom";

import { Paper, TextField, Button } from "@material-ui/core";

import { Formik } from "formik";

import { ROUTE_LOGIN } from "constants/routes";

import "./Recovery.scss";

const LoginLinkButton = () => (
  <Link to={ROUTE_LOGIN}>
    <Button className="register__button" fullWidth>Back to login</Button>
  </Link>
);

const RecoveryForm = ({ handleRecovery }) => (
  <Formik
    initialValues={{ email: "" }}
    onSubmit={({ username, password }, { setSubmitting, setErrors }) => handleRecovery(username, password, setErrors, setSubmitting)}
  >
    {({ handleSubmit, handleChange, values }) => (
      <Paper className="recovery__container">
        <form className="recovery__form" onSubmit={handleSubmit}>
          <h1>Recovery</h1>
          <p className="text-muted">Enter your Email</p>
          <TextField className="recovery__field" label="Email" id="email" name="email" type="email" autoComplete="email" autoFocus={true} value={values.email} onChange={handleChange}/>
          <Button className="recovery__button" variant="contained" color="primary" type="submit">Send Email</Button>
          <LoginLinkButton/>
        </form>
      </Paper>
    )}
  </Formik>
);

const Recovery = () => {
  const handleRecovery = (username, password, setErrors, setSubmitting) => {
    console.error("EMAIL RECOVERY NOT YET IMPLEMENTED");
  };

  return (
    <div className="recovery">
      <RecoveryForm handleRecovery={handleRecovery}/>
    </div>
  );
};

export default Recovery;