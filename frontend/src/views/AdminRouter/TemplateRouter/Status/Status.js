import React, { useCallback, useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { 
  getTemplatesRequest, 
  createTemplateRequest, 
  deleteTemplateRequest, 
  updateTemplateRequest 
} from "@thunks/statuses"

import MaterialTable from 'material-table'
import LaunchIcon from "@material-ui/icons/Launch";
import Paper from '@material-ui/core/Paper';

import Typography from "@material-ui/core/Typography";

// const TemplateFileDropzone = () => {}

// TODO : Finish Excel integration
const StatusHeader = () => {


  return (
    <Paper className="header">
      <Typography variant="h5">Templates</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  )
}

const StatusesTable = ({ history }) => {
  const dispatch = useDispatch()

  const {
    statuses
  } = useSelector(
    (
      {
        StatusStore: {
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
      { title: "Name", field: "name" },
      { title: "Description", field: "description" },
      { title: "Active", field: "isActive" },
      { title: "Creation", type: "date", field: "creeatedAt" },
      { title: "Modification", type: "date", field: "updatedAt" }
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
            status = {
              "_id": "5ea9d31a446e017d2b379bc0",
              "name": "sample",
              "statusData": {},
              "statusTypeId": "5eb02cb4a037591fed65a3f5",
              "userCreatorId": "507f191e810c19729de860ea",
              "creationDate": "2009-02-03T05:00:00.000Z",
              "expirationDate": "2010-05-05T04:00:00.000Z",
              "statusId": "5eb02cc0a037591fed65a3f6"
            }

            dispatch(createTemplateRequest(status))
            resolve()
          }
        ), 
        onRowUpdate: (status) => new Promise(
          (resolve) => {
            dispatch(updateTemplateRequest(status))
            resolve()
          }
        ), 
        onRowDelete: (status) => new Promise(
          (resolve) => {
            dispatch(deleteTemplateRequest(status._id))
            resolve()
          }
        ) 
      }
    ),
    [ dispatch ]
  )

  useEffect(
    () => {
      dispatch(getTemplatesRequest())
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

const Template = (props) => (
  <div>
    <StatusHeader/>
    {/* <FileDropzone/> */}
    <StatusesTable {...props}/>
  </div>
)

export default Template