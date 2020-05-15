import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import {
  getAppSysesRequest,
  createAppSysRequest,
  deleteAppSysRequest,
  updateAppSysRequest
} from "../../../store/thunks/AppSys"

import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper';

import Typography from "@material-ui/core/Typography";

import './AppSyses.scss'

const AppSysesHeader = () => {
  return (
    <Paper className="header">
      <Typography variant="h5">AppSyses</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  )
}

const AppSysesTable = ({ history }) => {
  const dispatch = useDispatch()
  const {
    AppSyses
  } = useSelector(
    (
      {
        AppSysesStore: {
          response: {
            Values
          }
        }
      }
    ) => (
        {
          AppSyses: Values
        }
      ),
    shallowEqual
  )

  const columns = useMemo(
    () => [
      { title: "_id", field: "_id" },
      { title: "Code", field: "code" },
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
        onRowAdd: (AppSys) => new Promise(
          (resolve, reject) => {
            dispatch(createAppSysRequest(AppSys, resolve, reject))
          }
        ),
        onRowUpdate: (AppSys) => new Promise(
          (resolve, reject) => {
            dispatch(updateAppSysRequest(AppSys, resolve, reject))
          }
        ),
        onRowDelete: (AppSys) => new Promise(
          (resolve, reject) => {
            dispatch(deleteAppSysRequest(AppSys._id, resolve, reject))
          }
        )
      }
    ),
    [dispatch]
  )

  useEffect(
    () => {
      dispatch(getAppSysesRequest())
    },
    [dispatch]
  )

  return (
    <MaterialTable
      columns={columns}
      data={AppSyses}
      editable={editable}
      options={options}
    />
  )
}

const AppSyses = (props) => (
  <div className="AppSyses">
    <AppSysesHeader />
    {/* <FileDropzone/> */}
    <AppSysesTable {...props} />
  </div>
)

export default AppSyses