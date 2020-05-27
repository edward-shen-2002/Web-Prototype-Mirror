import {
  FAIL_SUBMISSIONS_REQUEST,
  RECEIVE_SUBMISSIONS,
  REQUEST_SUBMISSIONS,
  CREATE_SUBMISSION,
  DELETE_SUBMISSION,
  UPDATE_SUBMISSION,
} from './actionTypes'

export const failSubmissionsRequest = (error) => ({
  type: FAIL_SUBMISSIONS_REQUEST,
  error,
})
export const receiveSubmissions = (response) => ({
  type: RECEIVE_SUBMISSIONS,
  response,
})
export const requestSubmissions = () => ({ type: REQUEST_SUBMISSIONS })
export const createSubmission = (response) => ({
  type: CREATE_SUBMISSION,
  response,
})
export const deleteSubmission = (response) => ({
  type: DELETE_SUBMISSION,
  response,
})
export const updateSubmission = (response) => ({
  type: UPDATE_SUBMISSION,
  response,
})
export const resetSubmissions = () => ({ type: RESET_SUBMISSIONS, response })
