import React from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import Fab from "@material-ui/core/Fab";
import AddCircleIcon from "@material-ui/icons/AddCircle";

export const DeleteButton = ({ handleDelete }) => (
  <IconButton onClick={handleDelete} aria-label="delete">
    <DeleteIcon/>
  </IconButton>
);

export const AddFabIconButton = ({ className, handleAdd, title }) => (
  <Fab className={className} color="primary" variant="extended" aria-label="add" onClick={handleAdd}>
    <AddCircleIcon/>
    {title}
  </Fab>
); 