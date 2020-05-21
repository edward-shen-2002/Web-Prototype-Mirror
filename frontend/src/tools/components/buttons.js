import React, { useMemo, useCallback } from "react";

import { useDispatch } from 'react-redux'

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import Fab from "@material-ui/core/Fab";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from '@material-ui/core/Button'

import { CustomEditor } from "@tools/slate";

import {
  openSubmissionPeriodDialog,
  openStatusDialog,
  openUserDialog
} from '../../store/actions/DialogsStore'

import { cx, css } from 'emotion'
import SubmissionPeriodIdDialog from "./dialogs/SubmissionPeriodDialog";
import StatusDialog from "./dialogs/StatusDialog";

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

export const SelectIdButton = ({ value, handleClick }) => {
  const text = useMemo(
    () => value === undefined ? 'Select Id' : value,
    [ value ]
  )

  return (
    <Button onClick={handleClick}>
      {text}
    </Button>
  )
}

export const SubmissionPeriodIdButton = ({ value, onChange }) => {
  const dispatch = useDispatch()

  const handleClick = useCallback(
    () => {
      dispatch(openSubmissionPeriodDialog())
    },
    [ dispatch ]
  )

  return (
    <div>
      <SelectIdButton value={value} handleClick={handleClick}/>
      <SubmissionPeriodIdDialog handleChange={onChange}/>
    </div>
  )
}

export const StatusIdButton = ({ value, onChange }) => {
  const dispatch = useDispatch()

  const handleClick = useCallback(
    () => {
      dispatch(openStatusDialog())
    },
    [ dispatch ]
  )

  return (
    <div>
      <SelectIdButton value={value} handleClick={handleClick}/>
      <StatusDialog handleChange={onChange}/>
    </div>
  )
}

export const UserIdButton = ({ value, onChange }) => {
  const dispatch = useDispatch()

  const handleClick = useCallback(
    () => {
      dispatch(openUserDialog())
    },
    [ dispatch ]
  )

  return (
    <div>
      <SelectIdButton value={value} handleClick={handleClick}/>
    </div>
  )
}
