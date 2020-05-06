import React, { useCallback, useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { 
  getTemplatesRequest, 
  createTemplateRequest, 
  deleteTemplateRequest, 
  updateTemplateRequest 
} from "@thunks/template"

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
          (resolve) => {
            template = {
              "_id": "5ea9d31a446e017d2b379bc0",
              "name": "sample",
              "templateData": {},
              "templateTypeId": "5eb1ae9d3168281b9c23d41e",
              "userCreatorId": "507f191e810c19729de860ea",
              "creationDate": "2009-02-03T05:00:00.000Z",
              "expirationDate": "2010-05-05T04:00:00.000Z",
              "statusId": "5eb1aeac3168281b9c23d41f"
            }

            dispatch(createTemplateRequest(template))
            resolve()
          }
        ), 
        onRowUpdate: (template) => new Promise(
          (resolve) => {
            dispatch(updateTemplateRequest(template))
            resolve()
          }
        ), 
        onRowDelete: (template) => new Promise(
          (resolve) => {
            dispatch(deleteTemplateRequest(template._id))
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

const Template = (props) => (
  <div className="templatesPage">
    <TemplateHeader/>
    {/* <FileDropzone/> */}
    <TemplatesTable {...props}/>
  </div>
)

export default Template