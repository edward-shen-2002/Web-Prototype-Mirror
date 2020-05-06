import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { 
  getPackagesRequest, 
  createPackageRequest, 
  deletePackageRequest, 
  updatePackageRequest 
} from '../../../../store/thunks/package'

import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper';

import Typography from "@material-ui/core/Typography";

import './Packages.scss'

const PackageHeader = () => {


  return (
    <Paper className="header">
      <Typography variant="h5">Packages</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  )
}

const PackagesTable = () => {
  const dispatch = useDispatch()

  const {
    packages
  } = useSelector(
    (
      {
        PackageStore: {
          response: {
            Values
          }
        }
      }
    ) => (
      {
        packages: Values
      }
    ),
    shallowEqual
  )

  const columns = useMemo(
    () => [
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
        onRowAdd: (package) => new Promise(
          (resolve) => {
            dispatch(createPackageRequest(package))
            resolve()
          }
        ), 
        onRowUpdate: (package) => new Promise(
          (resolve) => {
            dispatch(updatePackageRequest(package))
            resolve()
          }
        ), 
        onRowDelete: (package) => new Promise(
          (resolve) => {
            dispatch(deletePackageRequest(package._id))
            resolve()
          }
        ) 
      }
    ),
    [ dispatch ]
  )

  useEffect(
    () => {
      dispatch(getPackagesRequest())
    },
    [ dispatch ]
  )

  return (
    <MaterialTable
      columns={columns} 
      data={packages} 
      editable={editable} 
      options={options}
    />
  )
}

const Package = (props) => (
  <div className="packagesPage">
    <PackageHeader/>
    <PackagesTable {...props}/>
  </div>
)

export default Package