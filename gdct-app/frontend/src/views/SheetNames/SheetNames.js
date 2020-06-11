import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import {
  getSheetNamesRequest,
  createSheetNameRequest,
  deleteSheetNameRequest,
  updateSheetNameRequest,
} from '../../store/thunks/sheetName'

import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper'

import Typography from '@material-ui/core/Typography'

import './SheetNames.scss'
import { selectFactoryRESTResponseTableValues } from '../../store/common/REST/selectors'
import { selectSheetNamesStore } from '../../store/SheetNamesStore/selectors'

const SheetNameHeader = () => {
  return (
    <Paper className="header">
      <Typography variant="h5">SheetNames</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  )
}

const SheetNamesTable = () => {
  const dispatch = useDispatch()

  const { sheetNames } = useSelector((state) => ({
    sheetNames: selectFactoryRESTResponseTableValues(selectSheetNamesStore)(
      state
    ),
  }))

  const columns = useMemo(
    () => [
      { title: '_id', field: '_id', editable: 'never' },
      { title: 'Name', field: 'name' },
      { title: 'Active', type: 'boolean', field: 'isActive' },
    ],
    []
  )

  const options = useMemo(
    () => ({ actionsColumnIndex: -1, search: false, showTitle: false }),
    []
  )

  const editable = useMemo(
    () => ({
      onRowAdd: (sheetName) =>
        new Promise((resolve, reject) => {
          dispatch(createSheetNameRequest(sheetName, resolve, reject))
        }),
      onRowUpdate: (sheetName) =>
        new Promise((resolve, reject) => {
          dispatch(updateSheetNameRequest(sheetName, resolve, reject))
        }),
      onRowDelete: (sheetName) =>
        new Promise((resolve, reject) => {
          dispatch(deleteSheetNameRequest(sheetName._id, resolve, reject))
        }),
    }),
    [dispatch]
  )

  useEffect(() => {
    dispatch(getSheetNamesRequest())
  }, [dispatch])

  return (
    <MaterialTable
      columns={columns}
      data={sheetNames}
      editable={editable}
      options={options}
    />
  )
}

const SheetName = (props) => (
  <div className="sheetNames">
    <SheetNameHeader />
    <SheetNamesTable {...props} />
  </div>
)

export default SheetName