import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import {
  getAppRolesRequest,
  createAppRoleRequest,
  deleteAppRoleRequest,
  updateAppRoleRequest,
} from '../../../store/thunks/AppRole'

import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper'

import Typography from '@material-ui/core/Typography'

import './AppRoles.scss'
import { selectFactoryRESTResponseTableValues } from '../../../store/common/REST/selectors'
import { selectAppRolesStore } from '../../../store/AppRolesStore/selectors'

const AppRolesHeader = () => {
  return (
    <Paper className="header">
      <Typography variant="h5">AppRoles</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  )
}

const AppRolesTable = () => {
  const dispatch = useDispatch()
  const { appRoles } = useSelector(
    (state) => ({
      appRoles: selectFactoryRESTResponseTableValues(selectAppRolesStore)(
        state
      ),
    }),
    shallowEqual
  )

  const columns = useMemo(
    () => [
      { title: '_id', field: '_id', editable: 'naver' },
      { title: 'Code', field: 'code' },
      { title: 'Name', field: 'name' },
    ],
    []
  )

  const options = useMemo(
    () => ({ actionsColumnIndex: -1, search: false, showTitle: false }),
    []
  )

  const editable = useMemo(
    () => ({
      onRowAdd: (appRole) =>
        new Promise((resolve, reject) => {
          dispatch(createAppRoleRequest(appRole, resolve, reject))
        }),
      onRowUpdate: (appRole) =>
        new Promise((resolve, reject) => {
          dispatch(updateAppRoleRequest(appRole, resolve, reject))
        }),
      onRowDelete: (appRole) =>
        new Promise((resolve, reject) => {
          dispatch(deleteAppRoleRequest(appRole._id, resolve, reject))
        }),
    }),
    [dispatch]
  )

  useEffect(() => {
    dispatch(getAppRolesRequest())
  }, [dispatch])

  return (
    <MaterialTable
      columns={columns}
      data={appRoles}
      editable={editable}
      options={options}
    />
  )
}

const AppRoles = (props) => {
  console.log('why not: ', props)
  return (
    <div className="AppSyses">
      <AppRolesHeader />
      {/* <FileDropzone/> */}
      <AppRolesTable {...props} />
    </div>
  )
}

export default AppRoles
