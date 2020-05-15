import React, { useCallback, useEffect } from 'react'

import { useSelector, shallowEqual, useDispatch } from 'react-redux'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { closeCOADialog } from '../../../store/actions/DialogsStore'

import { selectCOACOATreeUI } from '../../../store/actions/COATreeStore'

import { getCOAsRequest } from "../../../store/thunks/COA"

import SelectableTable from '../../../tools/components/SelectableTable'

import { selectedCOAIdsSelector } from '../../../store/selectors/COATreeStore'

import './COATree.scss'
import 'react-sortable-tree/style.css';
import { useMemo } from 'react';

const COADialogContent = () => {
  const dispatch = useDispatch()

  const {
    COAs,
    selectedCOAIds
  } = useSelector(
    (
      {
        COAsStore: {
          response: {
            Values
          },
        },
        COATreeStore
      }
    ) => (
      {
        selectedCOAIds: selectedCOAIdsSelector(COATreeStore),
        COAs: Values
      }
    ),
    shallowEqual
  )

  const columns = useMemo(
    () => [
      { title: "_id", field: "_id" },
      { title: "Name", field: "name" }
    ],
    []
  )

  const getKey = useCallback(
    (item) => item._id 
  )

  const handleSelect = useCallback(
    (item) => {
      dispatch(selectCOACOATreeUI(item._id))
    },
    [ dispatch ]
  )

  return (
    <DialogContent>
      <SelectableTable data={COAs} columns={columns} selectedKeys={selectedCOAIds} getKey={getKey} handleSelect={handleSelect}/>
    </DialogContent>
  )
}

const COADialog = () => {
  const dispatch = useDispatch()

  const isCOADialogOpen = useSelector(
    (
      {
        DialogsStore: {
          isCOADialogOpen
        }
      }
    ) => isCOADialogOpen,
    shallowEqual
  )

  useEffect(
    () => {
      if(isCOADialogOpen) dispatch(getCOAsRequest())
    },
    [ dispatch, isCOADialogOpen ]
  )

  const handleCloseCOADialog = useCallback(
    () => dispatch(closeCOADialog()),
    [ dispatch ]
  )

  return (
    <Dialog open={isCOADialogOpen} onClose={handleCloseCOADialog}>
      <DialogTitle>COAs</DialogTitle>
      <COADialogContent/>
    </Dialog>
  )
}

export default COADialog