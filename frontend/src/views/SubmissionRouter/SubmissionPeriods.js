import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { 
  getSubmissionPeriodsRequest, 
  createSubmissionPeriodRequest, 
  deleteSubmissionPeriodRequest, 
  updateSubmissionPeriodRequest 
} from '../../store/thunks/submissionPeriod'

import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper';

import Typography from "@material-ui/core/Typography";

import { ReportingPeriodIdButton } from '../../tools/components/buttons'

const SubmissionPeriodHeader = () => {


  return (
    <Paper className="header">
      <Typography variant="h5">Submission Periods</Typography>
    </Paper>
  )
}

const SubmissionPeriod = () => {
  const dispatch = useDispatch()

  const {
    submissionPeriods
  } = useSelector(
    (
      {
        SubmissionPeriodsStore: {
          response: {
            Values
          }
        }
      }
    ) => (
      {
        submissionPeriods: Values
      }
    ),
    shallowEqual
  )

  const columns = useMemo(
    () => [
      { title: "_id", field: "_id", editable: "never" },
      { title: "Name", field: "name" },
      { title: "Start Date", type: "date", field: "startDate" },
      { title: "End Date", type: "date", field: "endDate" },
      { title: "ReportingPeriodId", field: "reportingPeriodId", editComponent: ReportingPeriodIdButton }
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
        onRowAdd: (submissionPeriod) => new Promise(
          (resolve, reject) => {
            dispatch(createSubmissionPeriodRequest(submissionPeriod, resolve, reject))
          }
        ), 
        onRowUpdate: (submissionPeriod) => new Promise(
          (resolve, reject) => {
            dispatch(updateSubmissionPeriodRequest(submissionPeriod, resolve, reject))
          }
        ), 
        onRowDelete: (submissionPeriod) => new Promise(
          (resolve, reject) => {
            dispatch(deleteSubmissionPeriodRequest(submissionPeriod._id, resolve, reject))
          }
        ) 
      }
    ),
    [ dispatch ]
  )

  useEffect(
    () => {
      dispatch(getSubmissionPeriodsRequest())
    },
    [ dispatch ]
  )

  return (
    <div>
      <SubmissionPeriodHeader/>
      <MaterialTable
        columns={columns} 
        data={submissionPeriods} 
        editable={editable} 
        options={options}
      />
    </div>
  )
}

export default SubmissionPeriod