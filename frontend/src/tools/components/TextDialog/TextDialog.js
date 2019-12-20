import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import "./TextDialog.scss";

const TextDialogContent = ({ message }) => (
  <DialogContent>
    <DialogContentText>{message}</DialogContentText>
  </DialogContent>
);

const TextDialogActionsButtons = ({
  handleDelete,
  handleClose
}) => (
  <ButtonGroup>
    <Button color="secondary" variant="contained" onClick={handleDelete}>Delete</Button>
    <Button variant="contained" onClick={handleClose}>Cancel</Button>
  </ButtonGroup>
);

const TextDialogActions = ({ handleDelete, handleClose }) => (
  <DialogActions>
    <TextDialogActionsButtons handleDelete={handleDelete} handleClose={handleClose}/>
  </DialogActions>
);

const TextDialog = ({
  open,
  title, 
  message,
  handleDelete,
  handleClose
}) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{title}</DialogTitle>
    <TextDialogContent message={message}/>
    <TextDialogActions handleDelete={handleDelete} handleClose={handleClose}/>
  </Dialog>
);

export default TextDialog;