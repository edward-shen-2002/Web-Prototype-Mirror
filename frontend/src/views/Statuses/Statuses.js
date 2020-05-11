import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { 
  getStatusesRequest, 
  createStatusRequest, 
  deleteStatusRequest, 
  updateStatusRequest 
} from '../../store/thunks/status'


import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper';

import Typography from "@material-ui/core/Typography";

import './Statuses.scss'

const StatusHeader = () => {


  return (
    <Paper className="header">
      <Typography variant="h5">Statuses</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  )
}

const StatusesTable = () => {
  const dispatch = useDispatch()

  const {
    statuses
  } = useSelector(
    (
      {
        StatusesStore: {
          response: {
            Values
          }
        }
      }
    ) => (
      {
        statuses: Values
      }
    ),
    shallowEqual
  )

  const columns = useMemo(
    () => [
      { title: "_id", field: "_id" },
      { title: "Name", field: "name" },
      { title: "Description", field: "description" },
      { title: "Active", type: "boolean", field: "isActive" }
    ],
    []
  )

  const options = useMemo(
    () => (
      { actionsColumnIndex: -1, search: false, showTitle: false }
    ),
    []
  )

  const editable = useMemo(
    () => (
      { 
        onRowAdd: (status) => new Promise(
          (resolve) => {
            // status = {

            // }

            dispatch(createStatusRequest(status))
            resolve()
          }
        ), 
        onRowUpdate: (status) => new Promise(
          (resolve) => {
            dispatch(updateStatusRequest(status))
            resolve()
          }
        ), 
        onRowDelete: (status) => new Promise(
          (resolve) => {
            dispatch(deleteStatusRequest(status._id))
            resolve()
          }
        ) 
      }
    ),
    [ dispatch ]
  )

  useEffect(
    () => {
      dispatch(getStatusesRequest())
    },
    [ dispatch ]
  )

  return (
    <MaterialTable
      columns={columns} 
      data={statuses} 
      editable={editable} 
      options={options}
    />
  )
}

const Status = (props) => (
  <div className="statusesPage">
    <StatusHeader/>
    <StatusesTable {...props}/>
  </div>
)

export default Status