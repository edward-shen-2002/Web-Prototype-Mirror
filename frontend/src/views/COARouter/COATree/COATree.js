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
import DialogTitle from '@material-ui/core/DialogTitle';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add'

import { useParams } from "react-router-dom";

import {
  openCOAGroupDialog,
  openCOADialog
} from '../../../store/actions/DialogsStore'

import {
  updateLocalCOATreeUI,
  deleteCOATreeUI
} from '../../../store/actions/COATreeStore'

import { 
  getCOAGroupsRequest
} from "../../../store/thunks/COAGroup"

import { 
  updateCOATreesRequest,
  createCOATreeRequest,
  getCOATreesRequest
} from "../../../store/thunks/COATree"

import GroupDialog from './COAGroupDialog'
import COADialog from './COADialog'

import './COATree.scss'
import 'react-sortable-tree/style.css';

const DeleteButton = (
  {
    handleClick
  }
) => (
  <IconButton aria-label="delete" onClick={handleClick}>
    <DeleteIcon />
  </IconButton>
)

const AddButton = (
  {
    handleClick
  }
) => (
  <IconButton aria-label="add" onClick={handleClick}>
    <AddIcon/>
  </IconButton>
)

const COATreeActions = ({ sheetNameId }) => {
  const dispatch = useDispatch()
  const handleOpenGroupDialog = useCallback(
    () => {
      dispatch(openCOAGroupDialog())
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

  const handleOpenCOADialog = useCallback(
    () => dispatch(openCOADialog()),
    [ dispatch ]
  )

  const nodeProps = useCallback(
    (nodeProps) => {
      const handleDelete = () => dispatch(deleteCOATreeUI(nodeProps.path))

      return {
        buttons: [ 
          <DeleteButton handleClick={handleDelete}/>,
          <AddButton handleClick={handleOpenCOADialog}/>
        ]
      }
    },
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
        generateNodeProps={nodeProps}
      />
      <COADialog/>
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