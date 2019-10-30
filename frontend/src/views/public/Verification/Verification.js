import React, { useEffect, useState } from "react";

import { verificationAxios } from "tools/rest";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import { REST_VERIFICATION } from "constants/rest";

import { ROUTE_LOGIN, ROUTE_REGISTER } from "constants/routes";

import "./Verification.scss";

const ReturnButtons = ({ handleGoToLogin, handleGoToRegister  }) => (
  <ButtonGroup >
    <Button onClick={handleGoToLogin}>Go to login</Button>
    <Button onClick={handleGoToRegister}>Go to Register</Button>
  </ButtonGroup>
);

const VerificationContent = ({ message, isDataFetched, handleGoToLogin, handleGoToRegister }) => (
  <Paper className="verificationContent">
    <p>{message}</p>
    {!isDataFetched && <CircularProgress/>}
    {isDataFetched && <ReturnButtons handleGoToLogin={handleGoToLogin} handleGoToRegister={handleGoToRegister}/>}
  </Paper>
);

// TODO : Possible issue with setTimeout and setIsDataFetched
const Verification = ({ history, match: { params: { _id } } }) => {
  const [ isDataFetched, setIsDataFetched ] = useState(false);
  const [ message, setMessage ] = useState("Activating your account...");

  useEffect(() => {
    if(!isDataFetched) {
      setTimeout(() => {
        verificationAxios.get(`${REST_VERIFICATION}/${_id}`)
          .then(({ data: { message } }) => setMessage(message))
          .catch(({ response: { data: { message } } }) => setMessage(message))
        setIsDataFetched(true);
      }, 3000); 
    }
  });

  const handleGoToLogin = () => history.push(ROUTE_LOGIN);
  const handleGoToRegister = () => history.push(ROUTE_REGISTER);

  return (
    <div className="verificationContainer">
      <VerificationContent message={message} isDataFetched={isDataFetched} handleGoToLogin={handleGoToLogin} handleGoToRegister={handleGoToRegister}/>
    </div>
  );
};

export default Verification;