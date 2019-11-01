import React, { useState, useEffect } from "react";

import { REST_ADMIN_DATAGROUPS } from "constants/rest";

import { adminDataRoleAxios } from "tools/rest";

import "react-sortable-tree/style.css";
import SortableTree from "react-sortable-tree";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddIcon from "@material-ui/icons/Add"; 
import FullScreenIcon from "@material-ui/icons/Fullscreen";
import FullScreenExitIcon from "@material-ui/icons/FullscreenExit";

import "./DataGroup.scss";

const ActionButtons = ({ handleOpenAddGroupDialog }) => (
  <div className="actionButtons">
    <Fab className="actionButtons__button" variant="extended" color="primary" aria-label="add" onClick={handleOpenAddGroupDialog}><AddIcon/>Add Group</Fab>
    <Fab className="actionButtons__button" variant="extended" aria-label="expand"><FullScreenIcon/>Expand</Fab>
    <Fab className="actionButtons__button" variant="extended" aria-label="collapsed"><FullScreenExitIcon/>Collapse</Fab>
  </div>
);

const AddGroupDialogActions = ({ handleSubmit, handleClose }) => (
  <DialogActions>
    <Button variant="outlined" onClick={handleSubmit}>Add</Button>
    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
  </DialogActions>
);

const AddGroupDialogContent = ({ handleChange }) => (
  <DialogContent>
    <TextField label="New Group" fullWidth autoFocus onChange={handleChange}/>
  </DialogContent>
);

const AddGroupDialog = ({ open, handleClose, handleAddGroup }) => {
  const [ group, setGroup ] = useState("");

  const handleSubmit = () => handleAddGroup({ title: group, children: [] });
  const handleChange = ({ target: { value } }) => setGroup(value); 

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new group</DialogTitle>
      <AddGroupDialogContent handleChange={handleChange}/>
      <AddGroupDialogActions handleSubmit={handleSubmit} handleClose={handleClose}/>
    </Dialog>
  );
};

const Header = ({ handleOpenAddGroupDialog }) => (
  <Paper className="header">
    <TextField className="header__searchField" label="Search field" type="search" variant="outlined"/>
    <ActionButtons handleOpenAddGroupDialog={handleOpenAddGroupDialog}/>
  </Paper>
);

const DataGroup = () => {
  const [ groups, setGroups ] = useState([]);
  const [ query, setQuery ] = useState("");
  const [ isDataFetched, setIsDataFetched ] = useState(false);
  const [ isAddGroupDialogOpen, setIsGroupDialogOpen ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      adminDataRoleAxios.get(REST_ADMIN_DATAGROUPS)
        .then(( { data: { data: { dataGroups } } }) => setGroups(dataGroups))
        .catch((error) => console.error(error));
      setIsDataFetched(true);
    }
  });

  const handleTreeDataChange = (treeData) => {
    setGroups(treeData);
  };

  const handleOpenAddGroupDialog = () => setIsGroupDialogOpen(true);
  const handleCloseAddGroupDialog = () => setIsGroupDialogOpen(false);

  // ? Check for common groups?
  const handleAddGroup = (newGroup) => {
    setGroups([ ...groups, newGroup ]);
    handleCloseAddGroupDialog();
  };

  return (
    <Paper className="dataGroup">
      <Header handleOpenAddGroupDialog={handleOpenAddGroupDialog}/>
      <SortableTree
        treeData={groups}
        onChange={handleTreeDataChange}
      />
      <AddGroupDialog open={isAddGroupDialogOpen} handleAddGroup={handleAddGroup} handleClose={handleCloseAddGroupDialog}/>
    </Paper>
  );
};

export default DataGroup;
