import React, { useCallback, useEffect } from 'react'

import SortableTree from 'react-sortable-tree'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import {
  updateOriginalCOATreeUI,
  loadCOATreeUI,
  updateLocalCOATreeUI,
  reverCOATreeUI
} from '../../../store/actions/COATreeStore'

import { 
  getCOAGroupsRequest
} from "../../../store/thunks/COAGroup"


import './COATree.scss'
import 'react-sortable-tree/style.css';
import Dialog from '@material-ui/core/Dialog'

// Need to fetch COA Group list and get from COAGroupStore

const GroupDialog = () => {
  const dispatch = useDispatch()
  
  const {
    isGroupDialogOpen
  } = useSelector(
    (
      {
        COATreeStore: {
          isGroupDialogOpen
        }
      }
    ) => (
      {
        isGroupDialogOpen
      }
    ),
    shallowEqual
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
    <Dialog open={isGroupDialogOpen}>

    </Dialog>
  )
}

const COATreeActions = () => {
  const dispatch = useDispatch()
  const handleOpenGroupDialog = useCallback(
    () => {

    },
    [ dispatch ]
  )

  return (
    <div className="header__actions">
      <TextField className="searchBar" variant="outlined" placeholder="Search node"/>
      <Button variant="contained" color="primary" onClick={handleOpenGroupDialog}>Add Group</Button>
      <GroupDialog/>
    </div>
  )
}

const COATreeHeader = () => {


  return (
    <Paper className="header">
      <Typography variant="h5">COA Tree</Typography>
      {/* <HeaderActions/> */}
      <COATreeActions/>
    </Paper>
  )
}
 
const COATreeTreeStructure = () => {
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

  const handleSave = useCallback(
    () => dispatch(updateOriginalCOATreeUI()),
    [ dispatch ]
  )

  useEffect(
    () => {
      dispatch(loadCOATreeUI(
        [
          {
            _id: 123,
            parentId: undefined
          },
          {
            _id: 124,
            parentId: 123
          },
          {
            _id: 125,
            parentId: undefined
          },
          {
            _id: 126,
            parentId: 124
          }
        ]
      ))
    },
    []
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

const COATree = () => (
  <div className="COATree">
    <COATreeHeader/>
    <COATreeTreeStructure/>
  </div>
)

export default COATree