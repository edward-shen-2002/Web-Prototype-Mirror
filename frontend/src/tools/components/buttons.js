import React from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import Fab from "@material-ui/core/Fab";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { CustomEditor } from "@tools/slate";

import { cx, css } from 'emotion'

export const DeleteButton = ({ handleDelete }) => (
  <IconButton onClick={handleDelete} aria-label="delete">
    <DeleteIcon/>
  </IconButton>
);

export const AddFabIconButton = ({ className, handleClick, title }) => (
  <Fab className={className} color="primary" variant="extended" aria-label="add" onClick={handleClick}>
    <AddCircleIcon/>
    {title}
  </Fab>
); 

export const MarkIcon = ({ className, ...props }) => (
  <span
    {...props}
    ref={ref}
    className={cx(
      'material-icons',
      className,
      css`
        font-size: 18px;
        vertical-align: text-bottom;
      `
    )}
  />
);

const MarkToggler = ({ className, active, reversed, ...props }) => (
  <span
    {...props}
    className={cx(
      className,
      css`
        cursor: pointer;
        color: ${reversed
          ? active
            ? 'white'
            : '#aaa'
          : active
          ? 'black'
          : '#ccc'};
      `
    )}
  />
);

export const MarkButton = ({ 
  format, 
  icon,
  editor
}) => {
  const handleMouseDown = (event) => {
    event.preventDefault();
    CustomEditor.toggleMark(editor, format);
  };

  return (
    <MarkToggler
      active={CustomEditor.isMarkActive(editor, format)}
      onMouseDown={handleMouseDown}
    >
      <MarkIcon>{icon}</MarkIcon>
    </MarkToggler>
  )
}