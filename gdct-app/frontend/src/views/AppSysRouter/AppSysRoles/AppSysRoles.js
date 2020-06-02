import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import {
  getAppSysRolesRequest,
  createAppSysRoleRequest,
  deleteAppSysRoleRequest,
  updateAppSysRoleRequest,
} from '../../../store/thunks/AppSysRole'

import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper'

import Typography from '@material-ui/core/Typography'

import './AppSysRoles.scss'
import { selectFactoryRESTResponseTableValues } from '../../../store/common/REST/selectors'
import { selectAppSysRolesStore } from '../../../store/AppSysRolesStore/selectors'

const AppSysRolesHeader = () => {
  return (
    <Paper className="header">
      <Typography variant="h5">AppSysRoles</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  )
}

const AppSysRolesTable = () => {
  const dispatch = useDispatch()
  const { appSysRoles } = useSelector(
    (state) => ({
      appSysRoles: selectFactoryRESTResponseTableValues(selectAppSysRolesStore)(state),
    }),
    shallowEqual
  )

  const columns = useMemo(
    () => [
      { title: '_id', field: '_id', editable: false },
      { title: 'AppSys', field: 'appSys' },
      { title: 'Role', field: 'role' },
    ],
    []
  )

  const options = useMemo(
    () => ({ actionsColumnIndex: -1, search: false, showTitle: false }),
    []
  )

  const editable = useMemo(
    () => ({
      onRowAdd: (appSysRole) =>
        new Promise((resolve, reject) => {
          dispatch(createAppSysRoleRequest(appSysRole, resolve, reject))
        }),
      onRowUpdate: (appSysRole) =>
        new Promise((resolve, reject) => {
          dispatch(updateAppSysRoleRequest(appSysRole, resolve, reject))
        }),
      onRowDelete: (appSysRole) =>
        new Promise((resolve, reject) => {
          dispatch(deleteAppSysRoleRequest(appSysRole._id, resolve, reject))
        }),
    }),
    [dispatch]
  )

  useEffect(() => {
    dispatch(getAppSysRolesRequest())
  }, [dispatch])

  return (
    <MaterialTable
      columns={columns}
      data={appSysRoles}
      editable={editable}
      options={options}
    />
  )
}

const AppSysRoles = (props) => (
  <div className="AppSysRoles">
    <AppSysRolesHeader />
    {/* <FileDropzone/> */}
    <AppSysRolesTable {...props} />
  </div>
)

export default AppSysRoles
