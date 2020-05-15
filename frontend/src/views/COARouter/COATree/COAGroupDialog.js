import React, { useCallback, useEffect } from 'react'

import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {
  closeCOAGroupDialog
} from '../../../store/actions/DialogsStore'

import { 
  getCOAGroupsRequest
} from "../../../store/thunks/COAGroup"

import { 
  createCOATreeRequest
} from "../../../store/thunks/COATree"

import SelectableTable from '../../../tools/components/SelectableTable'

import './COATree.scss'
import 'react-sortable-tree/style.css';

const GroupDialogActions = (
  {
    handleClose
  }
) => (
  <DialogActions>
    <Button color="secondary" variant="contained" onClick={handleClose}>Cancel</Button>
  </DialogActions>
)

const GroupDialogContent = ({ COAGroups, handleSelect }) => {
  const columns = [ "_id", "Name", "Code" ]
  const fields = [ "_id", "name", "code" ]
  return (
    <DialogContent>
      <SelectableTable columns={columns} fields={fields} listData={COAGroups} handleSelect={handleSelect}/>
    </DialogContent>
  )
}

const GroupDialog = ({ sheetNameId }) => {
  const dispatch = useDispatch()
  
  const {
    isCOAGroupDialogOpen,
    COAGroups
  } = useSelector(
    (
      {
        COAGroupsStore: {
          response: {
            Values
          }
        },
        DialogsStore: {
          isCOAGroupDialogOpen
        }
      }
    ) => (
      {
        isCOAGroupDialogOpen,
        COAGroups: Values
      }
    ),
    shallowEqual
  )
  
  const handleClose = useCallback(
    () => {
      dispatch(closeCOAGroupDialog())
    },
    [ dispatch ]
  )

  const handleSelect = useCallback(
    (COAGroup) => {
      dispatch(createCOATreeRequest(COAGroup, sheetNameId))
    },
    [ dispatch ]
  )

  useEffect(
    () => {
      if(isCOAGroupDialogOpen) {
        dispatch(getCOAGroupsRequest())
      }
    },
    [ dispatch, isCOAGroupDialogOpen ]
  )

  return (
    <Dialog open={isCOAGroupDialogOpen} onClose={handleClose}>
      <DialogTitle>COA Groups</DialogTitle>
      <GroupDialogContent COAGroups={COAGroups} handleSelect={handleSelect}/>
      <GroupDialogActions handleClose={handleClose}/>
    </Dialog>
  )
}

export default GroupDialog