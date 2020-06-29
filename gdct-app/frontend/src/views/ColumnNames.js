import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import {
  getColumnNamesRequest,
  createColumnNameRequest,
  deleteColumnNameRequest,
  updateColumnNameRequest,
} from '../store/thunks/columnName'

import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper'

import Typography from '@material-ui/core/Typography'

import { selectFactoryRESTResponseTableValues } from '../store/common/REST/selectors'
import { selectColumnNamesStore } from '../store/ColumnNamesStore/selectors'

const ColumnNameHeader = () => {
  return (
    <Paper className="header">
      <Typography variant="h5">ColumnNames</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  )
}

const ColumnNamesTable = () => {
  const dispatch = useDispatch()

  const { columnNames } = useSelector(
    (state) => ({
      columnNames: selectFactoryRESTResponseTableValues(selectColumnNamesStore)(
        state
      ),
    }),
    shallowEqual
  )

  const columns = useMemo(
    () => [
      { title: 'Name', field: 'name' },
      { title: 'Description', field: 'description' },
      { title: 'Active', type: 'boolean', field: 'isActive' },
    ],
    []
  )

  const options = useMemo(
    () => ({ actionsColumnIndex: -1, showTitle: false }),
    []
  )

  const editable = useMemo(
    () => ({
      onRowAdd: (columnName) =>
        new Promise((resolve, reject) => {
          dispatch(createColumnNameRequest(columnName, resolve, reject))
        }),
      onRowUpdate: (columnName) =>
        new Promise((resolve, reject) => {
          dispatch(updateColumnNameRequest(columnName, resolve, reject))
        }),
      onRowDelete: (columnName) =>
        new Promise((resolve, reject) => {
          dispatch(deleteColumnNameRequest(columnName._id, resolve, reject))
        }),
    }),
    [dispatch]
  )

  useEffect(() => {
    dispatch(getColumnNamesRequest())
  }, [dispatch])

  return (
    <MaterialTable
      columns={columns}
      data={columnNames}
      editable={editable}
      options={options}
    />
  )
}

const ColumnName = (props) => (
  <div className="columnNamesPage">
    <ColumnNameHeader />
    <ColumnNamesTable {...props} />
  </div>
)

export default ColumnName
