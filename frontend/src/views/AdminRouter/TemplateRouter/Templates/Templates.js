import React, { useCallback, useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { 
  getTemplatesRequest, 
  createTemplateRequest, 
  deleteTemplateRequest, 
  updateTemplateRequest 
} from "../../../../store/thunks/template"

import MaterialTable from 'material-table'
import LaunchIcon from "@material-ui/icons/Launch";
import Paper from '@material-ui/core/Paper';

import Typography from "@material-ui/core/Typography";

import './Templates.scss'

// const TemplateFileDropzone = () => {}

// TODO : Finish Excel integration
const TemplateHeader = () => {


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
      { title: "_id", field: "_id" },
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
        tooltip: "Open Template", 
        onClick: (_event, template) => history.push(`/designer/template/${template._id}`)
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
        onRowAdd: (template) => new Promise(
          (resolve, reject) => {
            dispatch(createTemplateRequest(template, resolve, reject))
          }
        ), 
        onRowUpdate: (template) => new Promise(
          (resolve, reject) => {
            dispatch(updateTemplateRequest(template, resolve, reject))
          }
        ), 
        onRowDelete: (template) => new Promise(
          (resolve, reject) => {
            dispatch(deleteTemplateRequest(template._id, resolve, reject))
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

const Template = (props) => (
  <div className="templatesPage">
    <TemplateHeader/>
    {/* <FileDropzone/> */}
    <TemplatesTable {...props}/>
  </div>
)

export default Template