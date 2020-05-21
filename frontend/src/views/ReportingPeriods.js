import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { 
  getReportingPeriodsRequest, 
  createReportingPeriodRequest, 
  deleteReportingPeriodRequest, 
  updateReportingPeriodRequest 
} from '../store/thunks/reportingPeriod'


import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper';

import Typography from "@material-ui/core/Typography";

const ReportingPeriodHeader = () => {


  return (
    <Paper className="header">
      <Typography variant="h5">Reporting Periods</Typography>
      {/* <HeaderActions/> */}
    </Paper>
  )
}

const ReportingPeriodsTable = () => {
  const dispatch = useDispatch()

  const {
    reportingPeriods
  } = useSelector(
    (
      {
        ReportingPeriodsStore: {
          response: {
            Values
          }
        }
      }
    ) => (
      {
        reportingPeriods: Values
      }
    ),
    shallowEqual
  )

  const columns = useMemo(
    () => [
      { title: "_id", field: "_id" },
      { title: "Name", field: "name" },
      { title: "Start Date", type: "date", field: "startDate" },
      { title: "End Date", type: "date", field: "endDate" },
      { title: "Application", field: "application" }
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
        onRowAdd: (reportingPeriod) => new Promise(
          (resolve, reject) => {
            dispatch(createReportingPeriodRequest(reportingPeriod, resolve, reject))
          }
        ), 
        onRowUpdate: (reportingPeriod) => new Promise(
          (resolve, reject) => {
            dispatch(updateReportingPeriodRequest(reportingPeriod, resolve, reject))
          }
        ), 
        onRowDelete: (reportingPeriod) => new Promise(
          (resolve, reject) => {
            dispatch(deleteReportingPeriodRequest(reportingPeriod._id, resolve, reject))
          }
        ) 
      }
    ),
    [ dispatch ]
  )

  useEffect(
    () => {
      dispatch(getReportingPeriodsRequest())
    },
    [ dispatch ]
  )

  return (
    <MaterialTable
      columns={columns} 
      data={reportingPeriods} 
      editable={editable} 
      options={options}
    />
  )
}

const ReportingPeriod = (props) => (
  <div className="reportingPeriods">
    <ReportingPeriodHeader/>
    <ReportingPeriodsTable {...props}/>
  </div>
)

export default ReportingPeriod