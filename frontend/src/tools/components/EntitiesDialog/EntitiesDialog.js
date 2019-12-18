import React, { useState } from "react";

import uniqid from "uniqid";

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

import { DeleteButton } from "tools/components/buttons";

import "./EntitiesDialog.scss";

const HierchyEntitiesListItems = ({ entities, handleAddEntity }) => entities.map((entity) => {
  const { name } = entity;

  const handleAddEntityItem = () => handleAddEntity(entity);

  return (
    <ListItem key={uniqid()} button onClick={handleAddEntityItem}>
      <ListItemText primary={name}/>
    </ListItem>
  )
});

const EntitiesList = ({ entities, handleAddEntity }) => (
  <List className="allEntitiesContent__items">
    <HierchyEntitiesListItems entities={entities} handleAddEntity={handleAddEntity}/>
  </List>
);

const AllEntitiesDialogContent = ({ entities, title, searchPlaceholder, handleQueryChange, handleAddEntity }) => (
  <div className="allEntitiesContent">
    <h5 className="allEntitiesContent__header">{title}</h5>
    <TextField label={searchPlaceholder} type="search" onChange={handleQueryChange} variant="outlined" fullWidth/>
    <EntitiesList entities={entities} handleAddEntity={handleAddEntity}/>
  </div>
);

const UserEntitiesListItemActions = ({ handleDeleteUserEntity }) => (
  <ListItemSecondaryAction>
    <DeleteButton handleDelete={handleDeleteUserEntity}/>
  </ListItemSecondaryAction>
);

const UserEntititesListItems = ({ userEntities, handleDeleteUserEntity }) => userEntities.map((userEntity) => {
  const { name } = userEntity;

  const handleDeleteUserEntityItem = () => handleDeleteUserEntity(userEntity);

  return (
    <ListItem key={uniqid()} button>
      <ListItemText primary={name}/>
      <UserEntitiesListItemActions handleDeleteUserEntity={handleDeleteUserEntityItem}/>
    </ListItem>
  );
});

const UserEntitiesList = ({ userEntities, handleDeleteUserEntity }) => (
  <List className="userEntitiesContent__items">
    <UserEntititesListItems userEntities={userEntities} handleDeleteUserEntity={handleDeleteUserEntity}/>
  </List>
);

const UserEntitiesDialogContent = ({ userEntities, title, searchPlaceholder, handleQueryChange, handleDeleteUserEntity }) => (
  <div className="userEntitiesContent">
    <h5 className="userEntitiesContent__header">{title}</h5>
    <TextField label={searchPlaceholder} type="search" onChange={handleQueryChange} variant="outlined" autoFocus fullWidth/>
    <UserEntitiesList userEntities={userEntities} handleDeleteUserEntity={handleDeleteUserEntity}/>
  </div>
);

const EntitiesDialogContent = ({ userEntities, entities, userTitle, allTitle, userSearchPlaceholder, allSearchPlaceholder, handleAddEntity, handleDeleteUserEntity }) => {
  const [ userEntitiesQuery, setUserEntitiesQuery ] = useState("");
  const [ entitiesQuery, setEntitiesQuery ] = useState("");

  let filteredUserEntities = userEntities.filter(({ name }) => name.toLowerCase().includes(userEntitiesQuery.toLowerCase()));
  let filteredEntities = entities.filter(({ name }) => name.toLowerCase().includes(entitiesQuery.toLowerCase()));

  const handleEntityQueryChange = ({ target: { value } }) => setEntitiesQuery(value);
  const handleUserEntityQueryChange = ({ target: { value } }) => setUserEntitiesQuery(value);

  return (
    <DialogContent className="entitiesContent">
      <UserEntitiesDialogContent userEntities={filteredUserEntities} title={userTitle} searchPlaceholder={userSearchPlaceholder} handleQueryChange={handleUserEntityQueryChange} handleDeleteUserEntity={handleDeleteUserEntity}/>
      <div className="verticalSeparator"></div>
      <AllEntitiesDialogContent entities={filteredEntities} title={allTitle} searchPlaceholder={allSearchPlaceholder} handleQueryChange={handleEntityQueryChange} handleAddEntity={handleAddEntity}/>
    </DialogContent>
  );
};

const EntitiesDialogActions = ({ handleClose }) => (
  <DialogActions>
    <Button onClick={handleClose}>Close</Button>
  </DialogActions>
);

const EntitiesDialog = ({ open, userEntities, entities, title, userTitle, allTitle, userSearchPlaceholder, allSearchPlaceholder, handleClose, handleAddEntity, handleDeleteUserEntity }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{title}</DialogTitle>
    <EntitiesDialogContent 
      userEntities={userEntities} 
      entities={entities} 
      userTitle={userTitle} 
      allTitle={allTitle} 
      userSearchPlaceholder={userSearchPlaceholder} 
      allSearchPlaceholder={allSearchPlaceholder} 
      handleAddEntity={handleAddEntity} 
      handleDeleteUserEntity={handleDeleteUserEntity}
    />
    <EntitiesDialogActions handleClose={handleClose}/>
  </Dialog>
);

export default EntitiesDialog;