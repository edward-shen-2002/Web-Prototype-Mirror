import React, { useCallback, useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { 
  getTemplateTypesRequest, 
  createTemplateTypeRequest, 
  deleteTemplateTypeRequest, 
  updateTemplateTypeRequest 
} from "@thunks/templateType"

import MaterialTable from 'material-table'
import LaunchIcon from "@material-ui/icons/Launch";
import Paper from '@material-ui/core/Paper';

import Typography from "@material-ui/core/Typography";

import './TemplateTypes.scss'

const TemplateTypeHeader = () => {


  return (
    <Paper className="header">
      <Typography variant="h5">Template Types</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  )
}

const TemplateTypesTable = ({ history }) => {
  const dispatch = useDispatch()

  const {
    templateTypes
  } = useSelector(
    (
      {
        TemplateTypeStore: {
          response: {
            Values
          }
        }
      }
    ) => (
      {
        templateTypes: Values
      }
    ),
    shallowEqual
  )

  const columns = useMemo(
    () => [
      { title: "_id", field: "_id" },
      { title: "Name", field: "name" },
      { title: "Description", field: "description" },
      { title: "Approvable", type: "boolean", field: "isApprovable" },
      { title: "Reviewable", type: "boolean", field: "isReviewable" },
      { title: "Submittable", type: "boolean", field: "isSubmittable" },
      { title: "Inputtable", type: "boolean", field: "isInputtable" },
      { title: "Viewable", type: "boolean", field: "isViewable" },
      { title: "Reportable", type: "boolean", field: "isReportable" }
    ],
    []
  )

  const actions = useMemo(
    () => [
      { 
        icon: LaunchIcon, 
        tooltip: "View Programs", 
        onClick: (_event, templateType) => {}
      }
    ],
    [ history ]
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
        onRowAdd: (templateType) => new Promise(
          (resolve) => {
            // templateType = {

            // }

            dispatch(createTemplateTypeRequest(templateType))
            resolve()
          }
        ), 
        onRowUpdate: (templateType) => new Promise(
          (resolve) => {
            dispatch(updateTemplateTypeRequest(templateType))
            resolve()
          }
        ), 
        onRowDelete: (templateType) => new Promise(
          (resolve) => {
            dispatch(deleteTemplateTypeRequest(templateType._id))
            resolve()
          }
        ) 
      }
    ),
    [ dispatch ]
  )

  useEffect(
    () => {
      dispatch(getTemplateTypesRequest())
    },
    [ dispatch ]
  )

  return (
    <MaterialTable
      columns={columns} 
      actions={actions} 
      data={templateTypes} 
      editable={editable} 
      options={options}
    />
  )
}

const TemplateType = (props) => (
  <div className="templateTypesPage">
    <TemplateTypeHeader/>
    {/* <FileDropzone/> */}
    <TemplateTypesTable {...props}/>
  </div>
)

export default TemplateType