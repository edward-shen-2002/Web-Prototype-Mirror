import React, { useMemo, useEffect } from 'react'
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

import './TemplatePackages.scss'

const TemplatePackageHeader = () => {


  return (
    <Paper className="header">
      <Typography variant="h5">Template Packages</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  )
}

const TemplatePackagesTable = ({ history }) => {
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

  const actions = useMemo(
    () => [
      { 
        icon: LaunchIcon, 
        tooltip: "Open Package", 
        onClick: (_event, templatePackage) => history.push(`/designer/templatePackage/${templatePackage._id}`)
      }
    ],
    [ history ]
  )

  const columns = useMemo(
    () => [
      { title: "_id", field: "_id" },
      { title: "Name", field: "name" },
      { title: "SubmissionPeriodId", field: "submissionPeriodId" },
      // { title: "TemplateIds", type: "boolean", field: "templateIds" },
      { title: "StatusId", field: "statusId" },
      { title: "Creation Date", field: "creationDate" },
      { title: "UserCreatorId", field: "userCreatorId" }
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
          (resolve) => {
            dispatch(createTemplatePackageRequest(templatePackage, resolve, reject))
          }
        ), 
        onRowUpdate: (templatePackage) => new Promise(
          (resolve) => {
            dispatch(updateTemplatePackageRequest(templatePackage, resolve, reject))
          }
        ), 
        onRowDelete: (templatePackage) => new Promise(
          (resolve) => {
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
    <MaterialTable
      columns={columns} 
      data={templatePackages} 
      actions={actions}
      editable={editable} 
      options={options}
    />
  )
}

const TemplatePackage = (props) => (
  <div className="templatePackages">
    <TemplatePackageHeader/>
    <TemplatePackagesTable {...props}/>
  </div>
)

export default TemplatePackage