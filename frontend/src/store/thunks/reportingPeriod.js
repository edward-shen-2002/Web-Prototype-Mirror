import { 
  requestReportingPeriods, 
  failReportingPeriodsRequest, 
  receiveReportingPeriods, 
  createReportingPeriod, 
  deleteReportingPeriod, 
  updateReportingPeriod 
} from '../actions/ReportingPeriodsStore'

import reportingPeriodController from '../../controllers/reportingPeriod'

export const getReportingPeriodsRequest = (query) => (dispatch) => {
  dispatch(requestReportingPeriods())

  reportingPeriodController.fetchReportingPeriods(query)
    .then((reportingPeriods) => {
      dispatch(receiveReportingPeriods({ Values: reportingPeriods }))
    })
    .catch((error) => {
      dispatch(failReportingPeriodsRequest(error))
    })
}

export const createReportingPeriodRequest = (reportingPeriod, resolve, reject) => (dispatch) => {
  dispatch(requestReportingPeriods())
  
  reportingPeriodController.createReportingPeriod(reportingPeriod)
    .then((reportingPeriod) => {
      dispatch(createReportingPeriod({ Value: reportingPeriod }))
      resolve()
    })
    .catch((error) => {
      dispatch(failReportingPeriodsRequest(error))
      reject()
    })
}

export const deleteReportingPeriodRequest = (_id, resolve, reject) => (dispatch) => {
  dispatch(requestReportingPeriods())

  reportingPeriodController.deleteReportingPeriod(_id)
    .then(() => {
      dispatch(deleteReportingPeriod({ Value: { _id } }))
      resolve()
    })
    .catch((error) => {
      dispatch(failReportingPeriodsRequest(error))
      reject()
    })
}

export const updateReportingPeriodRequest = (reportingPeriod, resolve, reject) => (dispatch) => {
  dispatch(requestReportingPeriods())

  reportingPeriodController.updateReportingPeriod(reportingPeriod)
    .then(() => {
      dispatch(updateReportingPeriod({ Value: reportingPeriod }))
      resolve()
    })
    .catch((error) => {
      dispatch(failReportingPeriodsRequest(error))
      reject()
    })
}