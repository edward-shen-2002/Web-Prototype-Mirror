import React, { useCallback, useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { 
  getCOATreesRequest, 
  createCOATreeRequest, 
  deleteCOATreeRequest, 
  updateCOATreeRequest 
} from "../../../store/thunks/COATree"

import MaterialTable from 'material-table'
import LaunchIcon from "@material-ui/icons/Launch";
import Paper from '@material-ui/core/Paper';

import Typography from "@material-ui/core/Typography";

import './COAs.scss'

const COATreesHeader = () => {


  return (
    <Paper className="header">
      <Typography variant="h5">COAs</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  )
}

const COATreesTable = ({ history }) => {
  const dispatch = useDispatch()

  const {
    COATrees
  } = useSelector(
    (
      {
        COATreesStore: {
          response: {
            Values
          }
        }
      }
    ) => (
      {
        COATrees: Values
      }
    ),
    shallowEqual
  )

  const columns = useMemo(
    () => [
      { title: "_id", field: "_id" },
      { title: "Name", field: "name" }
    ],
    []
  )

  const actions = useMemo(
    () => [
      { 
        icon: LaunchIcon, 
        tooltip: "View Tree", 
        onClick: (_event, COATree) => {}
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
        onRowAdd: (COATree) => new Promise(
          (resolve) => {
            // COATree = {

            // }

            dispatch(createCOATreeRequest(COATree))
            resolve()
          }
        ), 
        onRowUpdate: (COATree) => new Promise(
          (resolve) => {
            dispatch(updateCOATreeRequest(COATree))
            resolve()
          }
        ), 
        onRowDelete: (COATree) => new Promise(
          (resolve) => {
            dispatch(deleteCOATreeRequest(COATree._id))
            resolve()
          }
        ) 
      }
    ),
    [ dispatch ]
  )

  useEffect(
    () => {
      dispatch(getCOATreesRequest())
    },
    [ dispatch ]
  )

  return (
    <MaterialTable
      columns={columns} 
      actions={actions} 
      data={COATrees} 
      editable={editable} 
      options={options}
    />
  )
}

const COATrees = (props) => (
  <div className="COATrees">
    <COATreesHeader/>
    {/* <FileDropzone/> */}
    <COATreesTable {...props}/>
  </div>
)

export default COATrees