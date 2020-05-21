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
  openUserDialog,
  openTemplateTypeDialog,
  openReportingPeriodDialog
} from '../../store/actions/DialogsStore'

import { cx, css } from 'emotion'
import SubmissionPeriodDialog from "./dialogs/SubmissionPeriodDialog";
import StatusDialog from "./dialogs/StatusDialog";
import TemplateTypeDialog from "./dialogs/TemplateTypeDialog";
import ReportingPeriodDialog from './dialogs/ReportingPeriodDialog'

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

export const SelectIdButton = ({ value, action, children }) => {
  const dispatch = useDispatch()

  const text = useMemo(
    () => value === undefined ? 'SELECT ID' : value,
    [ value ]
  )

  const handleClick = useCallback(
    () => {
      dispatch(action())
    },
    [ dispatch ]
  )

  return (
    <div>
      <Button className="text-lowercase"  onClick={handleClick}>
        {text}
      </Button>
      {children}
    </div>
  )
}

export const SubmissionPeriodIdButton = ({ value, onChange }) =>  (
  <SelectIdButton value={value} action={openSubmissionPeriodDialog}>
    <SubmissionPeriodDialog handleChange={onChange}/>
  </SelectIdButton>
)

export const ReportingPeriodIdButton = ({ value, onChange }) =>  (
  <SelectIdButton value={value} action={openReportingPeriodDialog}>
    <ReportingPeriodDialog handleChange={onChange}/>
  </SelectIdButton>
)

export const StatusIdButton = ({ value, onChange }) => (
  <SelectIdButton value={value} action={openStatusDialog}>
    <StatusDialog handleChange={onChange}/>
  </SelectIdButton>
)

export const TemplateTypeIdButton = ({ value, onChange }) => (
  <SelectIdButton value={value} action={openTemplateTypeDialog}>
    <TemplateTypeDialog handleChange={onChange}/>
  </SelectIdButton>
)

export const UserIdButton = ({ value, onChange }) => (
  <SelectIdButton value={value} action={openUserDialog}>
    {/* <TemplateTypeDialog handleChange={onChange}/> */}
  </SelectIdButton>
)
