import React from "react";

import { connect } from "react-redux";

import { Fade, Paper, Typography } from "@material-ui/core";

import "./Profile.scss";

const BasicInformation = ({ username, email, firstName, lastName, phoneNumber }) => (
  <div>
    <Typography className="profile__subtitle" variant="button" gutterBottom>Basic Information</Typography>
    <hr/>
    <p>Username: {username}</p>
    <p>Email Address: {email}</p>
    <p>Name: {firstName} {lastName}</p>
    <p>Phone Number: {phoneNumber}</p>
  </div>
);

const AccountInformation = ({ validated, active, createDate }) => (
  <div>
    <Typography className="profile__subtitle" variant="button" gutterBottom>Account Information</Typography>
    <hr/>
    <p>Active: {active}</p>
    <p>Validated: {validated}</p>
    <p>Creation Date: {createDate}</p>
  </div>
);

const mapStateToProps = ({ domain: { account } }) => ({ account });


let Profile = ({ account: { username, email, firstName, lastName, phoneNumber, validated, active, createDate } }) => (
  <Fade in={true} timeout={500}>
    <Paper className="profile">
      <Typography variant="h5" gutterBottom>My Profile</Typography>
      <hr/>
      <BasicInformation username={username} email={email} firstName={firstName} lastName={lastName} phoneNumber={phoneNumber}/>
      <AccountInformation validated={validated} active={active} createDate={createDate}/>
    </Paper>
  </Fade>
);

Profile = connect(mapStateToProps)(Profile);

export default Profile;
