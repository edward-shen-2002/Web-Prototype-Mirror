import {
  FAIL_REPORTING_PERIODS_REQUEST,
  RECEIVE_REPORTING_PERIODS,
  REQUEST_REPORTING_PERIODS,
  CREATE_REPORTING_PERIOD,
  DELETE_REPORTING_PERIOD,
  UPDATE_REPORTING_PERIOD,
} from './actionTypes'

export const failReportingPeriodsRequest = (error) => ({
  type: FAIL_REPORTING_PERIODS_REQUEST,
  error,
})
export const receiveReportingPeriods = (response) => ({
  type: RECEIVE_REPORTING_PERIODS,
  response,
})
export const requestReportingPeriods = () => ({
  type: REQUEST_REPORTING_PERIODS,
})
export const createReportingPeriod = (response) => ({
  type: CREATE_REPORTING_PERIOD,
  response,
})
export const deleteReportingPeriod = (response) => ({
  type: DELETE_REPORTING_PERIOD,
  response,
})
export const updateReportingPeriod = (response) => ({
  type: UPDATE_REPORTING_PERIOD,
  response,
})
export const resetReportingPeriods = () => ({
  type: RESET_REPORTING_PERIODS,
  response,
})
