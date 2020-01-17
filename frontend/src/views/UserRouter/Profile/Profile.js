import React, { useMemo } from "react";

import { connect } from "react-redux";

import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";

import uniqid from "uniqid";

import { ROLE_LEVEL_ADMIN, ROLE_LEVEL_LHIN, ROLE_LEVEL_NOT_APPLICABLE } from "@constants/roles";

import "./Profile.scss";

const Field = ({ label, value, style }) => (
  <div style={style} className="profile__field">
    <Chip className="profile__label" label={label} color="primary"/>
    <div>{value}</div>
  </div>
);

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

const TooltipTitle = ({ scope, LHINs, organizations }) => (
  <div>
    <div>Scope: {scope}</div>
    <div>LHINs: {LHINs}</div>
    <div>Organizations: {organizations}</div>
  </div>
);

const RelevantRoles = ({ roles }) => (
  Object.keys(roles)
    .filter(({ scope }) => scope !== ROLE_LEVEL_NOT_APPLICABLE)
    .map((role) => {
      let roleData = roles[role];
      let { scope, LHINs, organizations } = roleData;

      let color;

      if(scope === ROLE_LEVEL_ADMIN) {
        color = "primary";

        LHINs = "*";
        organizations = "*";
      } else if(scope === ROLE_LEVEL_LHIN) {
        color = "secondary";
      } else {
        color = "default";
      }

      return (
        <Tooltip key={uniqid()} title={<TooltipTitle scope={scope} LHINs={LHINs} organizations={organizations}/>}>
          <Chip className="profile__role" label={role} color={color}/>
        </Tooltip>
      );
    })
);

const RolesContainer = ({ roles }) => (
  <div>
    <RelevantRoles roles={roles}/>
  </div>
);

const AccountInformation = ({ creationDate, roles }) => {
  // const rolesStyle = { display: "flex", flexFlow: "row nowrap" };

  return (
    <div>
      <Typography className="profile__subtitle" variant="button" gutterBottom>Account Information</Typography>
      <hr/>
      <Field label="Creation Date" value={<time>{new Date(creationDate).toLocaleString()}</time>}/>
      <Field label="Roles" value={<RolesContainer roles={roles}/>}/>
    </div>
  );
};

const mapStateToProps = ({ domain: { account } }) => ({ account });

let Profile = ({ account: { username, email, firstName, lastName, phoneNumber, creationDate, roles } }) => (
  <Fade in={true} timeout={500}>
    <Paper className="profile">
      <Typography variant="h5" gutterBottom>My Profile</Typography>
      <hr/>
      <BasicInformation username={username} email={email} firstName={firstName} lastName={lastName} phoneNumber={phoneNumber}/>
      <hr/>
      <AccountInformation creationDate={creationDate} roles={roles}/>
    </Paper>
  </Fade>
);

Profile = connect(mapStateToProps)(Profile);

export default Profile;
