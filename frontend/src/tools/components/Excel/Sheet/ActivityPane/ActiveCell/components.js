import React from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export const DialogActions = ({
  handleAdd,
  handleCancel
}) => (
  <ButtonGroup className="dialog__actions" fullWidth>
    <Button onClick={handleAdd}>Add</Button>
    <Button onClick={handleCancel}>Cancel</Button>
  </ButtonGroup>
);

export const LabeledTextField = ({ 
  label, 
  text, 
  textFieldProps, 
  handleChange 
}) => (
  <div className="field">
    <Typography className="field__label">{label}</Typography>
    <TextField className="field__input" value={text} onChange={handleChange} {...textFieldProps} fullWidth/>
  </div>
);

export const PersonAvatar = () => (
  <Avatar>
    <AccountCircleIcon />
  </Avatar>
);

export const DeleteIconButton = ({ handleClick }) => (
  <IconButton onClick={handleClick}>
    <DeleteForeverIcon/>
  </IconButton>
);
