import React, { useMemo, useEffect, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { 
  getTemplatePackagesRequest, 
  createTemplatePackageRequest, 
  deleteTemplatePackageRequest, 
  updateTemplatePackageRequest 
} from '../../../store/thunks/templatePackage'

import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper';
import LaunchIcon from "@material-ui/icons/Launch";

import Typography from "@material-ui/core/Typography";

import {
  UserIdButton,
  StatusIdButton,
  SubmissionPeriodIdButton
} from '../../../tools/components/buttons'

import './TemplatePackages.scss'

const TemplatePackageHeader = () => {


  return (
    <Paper className="header">
      <Typography variant="h5">Template Packages</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  )
}

const TemplatePackage = () => {
  const dispatch = useDispatch()

  const {
    templatePackages
  } = useSelector(
    (
      {
        TemplatePackagesStore: {
          response: {
            Values
          }
        }
      }
    ) => (
      {
        templatePackages: Values
      }
    ),
    shallowEqual
  )

  const columns = useMemo(
    () => [
      { title: "_id", field: "_id", editable: "never" },
      { title: "Name", field: "name" },
      { title: "SubmissionPeriodId", field: "submissionPeriodId", editComponent: SubmissionPeriodIdButton },
      // { title: "TemplateIds", type: "boolean", field: "templateIds" },
      { title: "StatusId", field: "statusId", editComponent: StatusIdButton },
      { title: "Creation Date", field: "creationDate", type: 'date' },
      { title: "UserCreatorId", field: "userCreatorId", editComponent: UserIdButton }
    ],
    []
  )

  const options = useMemo(
    () => (
      { 
        actionsColumnIndex: -1, 
        search: false, 
        showTitle: false        
      }
    ),
    []
  )

  const editable = useMemo(
    () => (
      { 
        onRowAdd: (templatePackage) => new Promise(
          (resolve, reject) => {
            console.log(templatePackage)
            templatePackage = { ...templatePackage, templateIds: [] }
            dispatch(createTemplatePackageRequest(templatePackage, resolve, reject))
          }
        ), 
        onRowUpdate: (templatePackage) => new Promise(
          (resolve, reject) => {
            dispatch(updateTemplatePackageRequest(templatePackage, resolve, reject))
          }
        ), 
        onRowDelete: (templatePackage) => new Promise(
          (resolve, reject) => {
            dispatch(deleteTemplatePackageRequest(templatePackage._id, resolve, reject))
          }
        ) 
      }
    ),
    [ dispatch ]
  )

  useEffect(
    () => {
      dispatch(getTemplatePackagesRequest())
    },
    [ dispatch ]
  )

  return (
    <div>
      <TemplatePackageHeader/>
      <MaterialTable
        columns={columns} 
        data={templatePackages} 
        editable={editable} 
        options={options}
      />
    </div>
  )
}

export default TemplatePackage