import React, { useCallback, useEffect } from 'react'

import { useSelector, shallowEqual, useDispatch } from 'react-redux'

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
  closeCOADialog
} from '../../../store/actions/DialogsStore'

import { } from '../../../store/actions/COATreeStore'

import {  getCOATreesRequest } from "../../../store/thunks/COATree"

import './COATree.scss'
import 'react-sortable-tree/style.css';


const COADialog = () => {
  const dispatch = useDispatch()

  const {
    COAs,
    isCOADialogOpen,
    nodeCOAs
  } = useSelector(
    (
      {
        COAsStore: {
          response: {
            Values
          },
        },
        COATreeStore: {
          nodeCOAs
        },
        DialogsStore: {
          isCOADialogOpen
        }
      }
    ) => (
      {
        COAs: Values,
        isCOADialogOpen,
        nodeCOAs
      }
    ),
    shallowEqual
  ) 

  const handleCloseCOADialog = useCallback(
    () => dispatch(closeCOADialog()),
    [ dispatch ]
   )

  return (
    <Dialog open={isCOADialogOpen} onClose={handleCloseCOADialog}>

    </Dialog>
  )
}

export default COADialog