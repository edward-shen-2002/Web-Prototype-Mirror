import React, { useCallback, useEffect } from 'react'

import SortableTree from 'react-sortable-tree'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useParams } from "react-router-dom";

import {
  updateOriginalCOATreeUI,
  loadCOATreeUI,
  updateLocalCOATreeUI,
  reverCOATreeUI,
  openGroupCOATreeUIDialog,
  closeGroupCOATreeUIDialog,
  addCOATree
} from '../../../store/actions/COATreeStore'

import { 
  getCOAGroupsRequest
} from "../../../store/thunks/COAGroup"

import { 
  updateCOATreesRequest,
  createCOATreeRequest,
  getCOATreesRequest
} from "../../../store/thunks/COATree"


import './COATree.scss'
import 'react-sortable-tree/style.css';

const GroupTableCell = ({ value, props }) => (
  <TableCell align="right" {...props}>{value}</TableCell>
)

const GroupDialogActions = (
  {
    handleClose
  }
) => (
  <DialogActions>
    <Button color="secondary" variant="contained" onClick={handleClose}>Cancel</Button>
  </DialogActions>
)

const GroupListItems = ({ COAGroups, handleSelect }) => COAGroups.map(
  (
    COAGroup
  ) => {
    const {
      _id,
      name,
      code
    } = COAGroup

    const handleClick = useCallback(
      () => handleSelect(COAGroup),
      [ handleSelect ]
    )

    return (
      <TableRow key={_id} className="groupList__item" onClick={handleClick}>
        <GroupTableCell value={_id}/>
        <GroupTableCell value={name}/>
        <GroupTableCell value={code}/>
      </TableRow>
    )
  }
)

const GroupTableBody = ({ COAGroups, handleSelect }) => (
  <TableBody>
    <GroupListItems COAGroups={COAGroups} handleSelect={handleSelect}/>
  </TableBody>
)

const GroupTableHead = () => (
  <TableHead>
    <TableRow>
      <GroupTableCell value="_id"/>
      <GroupTableCell value="Name"/>
      <GroupTableCell value="Code"/>
      {/* <TableCell align="right">isActive</TableCell> */}
    </TableRow>
  </TableHead>
)

const GroupTable = ({ COAGroups, handleSelect }) => (
  <Table>
    <GroupTableHead/>
    <GroupTableBody COAGroups={COAGroups} handleSelect={handleSelect}/>
  </Table>
)

const GroupDialogContent = ({ COAGroups, handleSelect }) => (
  <DialogContent>
    <GroupTable COAGroups={COAGroups} handleSelect={handleSelect}/>
  </DialogContent>
)

const GroupDialog = ({ sheetNameId }) => {
  const dispatch = useDispatch()
  
  const {
    isGroupDialogOpen,
    COAGroups
  } = useSelector(
    (
      {
        COATreeStore: {
          isGroupDialogOpen
        },
        COAGroupsStore: {
          response: {
            Values
          }
        }
      }
    ) => (
      {
        isGroupDialogOpen,
        COAGroups: Values
      }
    ),
    shallowEqual
  )
  
  const handleClose = useCallback(
    () => {
      dispatch(closeGroupCOATreeUIDialog())
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
      if(isGroupDialogOpen) {
        dispatch(getCOAGroupsRequest())
      }
    },
    [ dispatch, isGroupDialogOpen ]
  )

  return (
    <Dialog open={isGroupDialogOpen} onClose={handleClose}>
      <DialogTitle>COA Groups</DialogTitle>
      <GroupDialogContent COAGroups={COAGroups} handleSelect={handleSelect}/>
      <GroupDialogActions handleClose={handleClose}/>
    </Dialog>
  )
}

const COATreeActions = ({ sheetNameId }) => {
  const dispatch = useDispatch()
  const handleOpenGroupDialog = useCallback(
    () => {
      dispatch(openGroupCOATreeUIDialog())
    },
    [ dispatch ]
  )

  // TODO
  const handleSave = useCallback(
    () => dispatch(updateCOATreesRequest(sheetNameId)),
    [ dispatch ]
  )

  return (
    <div className="header__actions">
      <TextField className="searchBar" variant="outlined" placeholder="Search node"/>
      <Button variant="contained" color="primary" onClick={handleOpenGroupDialog}>Add Group</Button>
      <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
      <GroupDialog sheetNameId={sheetNameId}/>
    </div>
  )
}

const COATreeHeader = ({ sheetNameId }) => {


  return (
    <Paper className="header">
      <Typography variant="h5">COA Tree</Typography>
      {/* <HeaderActions/> */}
      <COATreeActions sheetNameId={sheetNameId}/>
    </Paper>
  )
}
 
const COATreeTreeStructure = ({ sheetNameId }) => {
  const dispatch = useDispatch()

  const {
    localTree,
    isCallInProgress
  } = useSelector(
    (
      {
        COATreeStore: {
          localTree,
          isCallInProgress
        }
      }
    ) => (
      {
        localTree,
        isCallInProgress
      }
    ),
    shallowEqual
  )
  const handleChange = useCallback(
    (treeData) => dispatch(updateLocalCOATreeUI(treeData)),
    [ dispatch ]
  )

  useEffect(
    () => {
      dispatch(getCOATreesRequest(sheetNameId))
    },
    [ dispatch, sheetNameId ]
  )
  
  return (
    <Paper className="COATreeContent">
      <SortableTree
        treeData={localTree}
        onChange={handleChange}
      />
    </Paper>
  )
}

const COATree = () => {
  const { _id: sheetNameId } = useParams()

  return (
    <div className="COATree">
      <COATreeHeader sheetNameId={sheetNameId}/>
      <COATreeTreeStructure sheetNameId={sheetNameId}/>
    </div>
  )
}

export default COATree