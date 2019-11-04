import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import DeleteIcon from "@material-ui/icons/Delete";

import uniqid from "uniqid";

import IconButton from "@material-ui/core/IconButton";

import "./OrganizationsDialog.scss";

const OrganizationsListItems = ({ organizations, handleAddOrganization }) => organizations.map((organization) => {
  const { name } = organization;

  const handleAddOrganizationItem = () => handleAddOrganization(organization);

  return (
    <ListItem key={uniqid()} button onClick={handleAddOrganizationItem}>
      <ListItemText primary={name}/>
    </ListItem>
  )
});

const OrganizationsList = ({ organizations, handleAddOrganization }) => (
  <List>
    <OrganizationsListItems organizations={organizations} handleAddOrganization={handleAddOrganization}/>
  </List>
);

const AllOrganizationsDialogContent = ({ organizations, handleQueryChange, handleAddOrganization }) => (
  <div className="allOrganizationsContent">
    <TextField label="Search Organizations..." type="search" onChange={handleQueryChange} variant="outlined" fullWidth/>
    <OrganizationsList organizations={organizations} handleAddOrganization={handleAddOrganization}/>
  </div>
);

const DeleteButton = ({ handleDelete }) => (
  <IconButton onClick={handleDelete} aria-label="delete">
    <DeleteIcon/>
  </IconButton>
);

const UserOrganizationsListItemActions = ({ handleDeleteUserOrganization }) => (
  <ListItemSecondaryAction>
    <DeleteButton handleDelete={handleDeleteUserOrganization}/>
  </ListItemSecondaryAction>
);

const UserOrganizationsListItems = ({ userOrganizations, handleDeleteUserOrganization }) => userOrganizations.map((userOrganization) => {
  const { name } = userOrganization;

  const handleDeleteUserOrganizationItem = () => handleDeleteUserOrganization(userOrganization);

  return (
    <ListItem key={uniqid()} button>
      <ListItemText primary={name}/>
      <UserOrganizationsListItemActions handleDeleteUserOrganization={handleDeleteUserOrganizationItem}/>
    </ListItem>
  );
});

const UserOrganizationsList = ({ userOrganizations, handleDeleteUserOrganization }) => (
  <List>
    <UserOrganizationsListItems userOrganizations={userOrganizations} handleDeleteUserOrganization={handleDeleteUserOrganization}/>
  </List>
);

const UserOrganizationsDialogContent = ({ userOrganizations, handleQueryChange, handleDeleteUserOrganization }) => (
  <div className="userOrganizationsContent">
    <TextField label="Search User Organizations..." type="search" onChange={handleQueryChange} variant="outlined" autoFocus fullWidth/>
    <UserOrganizationsList userOrganizations={userOrganizations} handleDeleteUserOrganization={handleDeleteUserOrganization}/>
  </div>
);

const OrganizationsDialogContent = ({ userOrganizations, organizations, handleAddOrganization, handleDeleteUserOrganization }) => {
  const [ userOrganizationsQuery, setUserOrganizationsQuery ] = useState("");
  const [ organizationsQuery, setOrganizationsQuery ] = useState("");

  let filteredUserOrganizations = userOrganizations.filter(({ name }) => name.toLowerCase().includes(userOrganizationsQuery.toLowerCase()));
  let filteredOrganizations = organizations.filter(({ name }) => name.toLowerCase().includes(organizationsQuery.toLowerCase()));

  const handleOrganizationsQueryChange = ({ target: { value } }) => setOrganizationsQuery(value);
  const handleUserOrganizationsQueryChange = ({ target: { value } }) => setUserOrganizationsQuery(value);

  return (
    <DialogContent className="organizationsContent">
      <UserOrganizationsDialogContent userOrganizations={filteredUserOrganizations} handleQueryChange={handleUserOrganizationsQueryChange} handleDeleteUserOrganization={handleDeleteUserOrganization}/>
      <div className="verticalSeparator"></div>
      <AllOrganizationsDialogContent organizations={filteredOrganizations} handleQueryChange={handleOrganizationsQueryChange} handleAddOrganization={handleAddOrganization}/>
    </DialogContent>
  );
};

const OrganizationsDialogActions = ({ handleClose }) => (
  <DialogActions>
    <Button onClick={handleClose}>Close</Button>
  </DialogActions>
);

const OrganizationsDialog = ({ open, userOrganizations, organizations, handleClose, handleAddOrganization, handleDeleteUserOrganization }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>User Organizations</DialogTitle>
    <OrganizationsDialogContent userOrganizations={userOrganizations} organizations={organizations} handleAddOrganization={handleAddOrganization} handleDeleteUserOrganization={handleDeleteUserOrganization}/>
    <OrganizationsDialogActions handleClose={handleClose}/>
  </Dialog>
);

export default OrganizationsDialog;