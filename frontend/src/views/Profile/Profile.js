import React from "react";

import { connect } from "react-redux";

import { Fade, Paper, Typography } from "@material-ui/core";

import "./Profile.scss";

const Field = ({ label, value }) => <p className="profile__field"><strong>{label}</strong>: {value}</p>;

const BasicInformation = ({ username, email, firstName, lastName, phoneNumber }) => (
  <div>
    <Typography className="profile__subtitle" variant="button" gutterBottom>Basic Information</Typography>
    <hr/>
    <Field label="Username" value={username}/>
    <Field label="Email Address" value={email}/>
    <Field label="Name" value={`${firstName} ${lastName}`}/>
    <Field label="Phone Number" value={phoneNumber}/>
  </div>
);

const AccountInformation = ({ validated, active, creationDate }) => (
  <div>
    <Typography className="profile__subtitle" variant="button" gutterBottom>Account Information</Typography>
    <hr/>
    <Field label="Active" value={active.toString()}/>
    <Field label="Validated" value={validated.toString()}/>
    <Field label="Creation Date" value={creationDate}/>
  </div>
);

const mapStateToProps = ({ domain: { account } }) => ({ account });

let Profile = ({ account: { username, email, firstName, lastName, phoneNumber, validated, active, creationDate } }) => (
  <Fade in={true} timeout={500}>
    <Paper className="profile">
      <Typography variant="h5" gutterBottom>My Profile</Typography>
      <hr/>
      <BasicInformation username={username} email={email} firstName={firstName} lastName={lastName} phoneNumber={phoneNumber}/>
      <hr/>
      <AccountInformation validated={validated} active={active} creationDate={creationDate}/>
    </Paper>
  </Fade>
);

Profile = connect(mapStateToProps)(Profile);

export default Profile;
