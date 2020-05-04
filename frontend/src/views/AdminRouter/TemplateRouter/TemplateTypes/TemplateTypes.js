import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { 
  getTemplatesRequest, 
  createTemplateRequest, 
  deleteTemplateRequest, 
  updateTemplateRequest 
} from "@thunks/templateType"

import MaterialTable from 'material-table'
import LaunchIcon from "@material-ui/icons/Launch";
import Paper from '@material-ui/core/Paper';

import Typography from "@material-ui/core/Typography";

import './TemplateTypes.scss'

// const TemplateFileDropzone = () => {}

// TODO : Finish Excel integration
const TemplateTypesHeader = () => {


  return (
    <Paper className="header">
      <Typography variant="h5">Templates</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  )
}

const TemplatesTable = ({ history }) => {
  const dispatch = useDispatch()

  const {
    templates
  } = useSelector(
    (
      {
        TemplateStore: {
          response: {
            Values
          }
        }
      }
    ) => (
      {
        templates: Values
      }
    ),
    shallowEqual
  )


  const columns = useMemo(
    () => [
      { title: "Name", field: "name" },
      { title: "TemplateTypeId", field: "templateTypeId" },
      { title: "UserCreatorId", field: "userCreatorId" },
      { title: "CreationDate", type: "date", field: "creationDate" },
      { title: "ExpirationDate", type: "date", field: "expirationDate" },
      { title: "StatusId", field: "statusId" }
    ],
    []
  )

  const actions = useMemo(
    () => [
      { 
        icon: LaunchIcon, 
        tooltip: "Open TemplateType", 
        onClick: (_event, templateType) => history.push(`/template_manager/templateType/${templateType._id}`)
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
            dispatch(createTemplateRequest(templateType))
            resolve()
          }
        ), 
        onRowUpdate: (templateType) => new Promise(
          (resolve) => {
            dispatch(updateTemplateRequest(templateType))
            resolve()
          }
        ), 
        onRowDelete: (templateType) => new Promise(
          (resolve) => {
            dispatch(deleteTemplateRequest(templateType._id))
            resolve()
          }
        ) 
      }
    ),
    [ dispatch ]
  )

  useEffect(
    () => {
      dispatch(getTemplatesRequest())
    },
    [ dispatch ]
  )

  return (
    <MaterialTable
      columns={columns} 
      actions={actions} 
      data={templates} 
      editable={editable} 
      options={options}
    />
  )
}

const TemplateType = (props) => (
  <div className="">
    <TemplateTypesHeader/>
    {/* <FileDropzone/> */}
    <TemplatesTable {...props}/>
  </div>
)

export default TemplateType