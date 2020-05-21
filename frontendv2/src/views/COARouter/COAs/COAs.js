import React, { useCallback, useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { 
  getCOAsRequest, 
  createCOARequest, 
  deleteCOARequest, 
  updateCOARequest 
} from "../../../store/thunks/COA"

import MaterialTable from 'material-table'
import LaunchIcon from "@material-ui/icons/Launch";
import Paper from '@material-ui/core/Paper';

import Typography from "@material-ui/core/Typography";

import './COAs.scss'

const COAsHeader = () => {


  return (
    <Paper className="header">
      <Typography variant="h5">COAs</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  )
}

const COAsTable = ({ history }) => {
  const dispatch = useDispatch()

  const {
    COAs
  } = useSelector(
    (
      {
        COAsStore: {
          response: {
            Values
          }
        }
      }
    ) => (
      {
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

  const options = useMemo(
    () => (
      { actionsColumnIndex: -1, search: false, showTitle: false }
    ),
    []
  )

  const editable = useMemo(
    () => (
      { 
        onRowAdd: (COA) => new Promise(
          (resolve, reject) => {
            dispatch(createCOARequest(COA, resolve, reject))
          }
        ), 
        onRowUpdate: (COA) => new Promise(
          (resolve, reject) => {
            dispatch(updateCOARequest(COA, resolve, reject))
          }
        ), 
        onRowDelete: (COA) => new Promise(
          (resolve, reject) => {
            dispatch(deleteCOARequest(COA._id, resolve, reject))
          }
        ) 
      }
    ),
    [ dispatch ]
  )

  useEffect(
    () => {
      dispatch(getCOAsRequest())
    },
    [ dispatch ]
  )

  return (
    <MaterialTable
      columns={columns} 
      data={COAs} 
      editable={editable} 
      options={options}
    />
  )
}

const COAs = (props) => (
  <div className="COAs">
    <COAsHeader/>
    {/* <FileDropzone/> */}
    <COAsTable {...props}/>
  </div>
)

export default COAs