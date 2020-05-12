import React, { useCallback, useEffect } from 'react'

import SortableTree from 'react-sortable-tree'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import Paper from '@material-ui/core/Paper'

import {
  updateOriginalCOATreeUI,
  loadCOATreeUI,
  updateLocalCOATreeUI,
  reverCOATreeUI
} from '../../../store/actions/COATreeStore'

import './COATree.scss'
import 'react-sortable-tree/style.css';
 
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
    []
  )

  useEffect(
    () => {
      // dispatch()
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
    <COATreeTreeStructure/>
  </div>
)

export default COATree