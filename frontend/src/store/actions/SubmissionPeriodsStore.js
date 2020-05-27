import {
  FAIL_SUBMISSION_PERIODS_REQUEST,
  RECEIVE_SUBMISSION_PERIODS,
  REQUEST_SUBMISSION_PERIODS,
  CREATE_SUBMISSION_PERIOD,
  DELETE_SUBMISSION_PERIOD,
  UPDATE_SUBMISSION_PERIOD,
} from './actionTypes'

export const failSubmissionPeriodsRequest = (error) => ({
  type: FAIL_SUBMISSION_PERIODS_REQUEST,
  error,
})
export const receiveSubmissionPeriods = (response) => ({
  type: RECEIVE_SUBMISSION_PERIODS,
  response,
})
export const requestSubmissionPeriods = () => ({
  type: REQUEST_SUBMISSION_PERIODS,
})
export const createSubmissionPeriod = (response) => ({
  type: CREATE_SUBMISSION_PERIOD,
  response,
})
export const deleteSubmissionPeriod = (response) => ({
  type: DELETE_SUBMISSION_PERIOD,
  response,
})
export const updateSubmissionPeriod = (response) => ({
  type: UPDATE_SUBMISSION_PERIOD,
  response,
})
export const resetSubmissionPeriods = () => ({
  type: RESET_SUBMISSION_PERIODS,
  response,
})
