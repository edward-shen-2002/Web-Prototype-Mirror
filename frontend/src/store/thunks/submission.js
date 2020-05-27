import {
  requestSubmissions,
  failSubmissionsRequest,
  receiveSubmissions,
  createSubmission,
  deleteSubmission,
  updateSubmission,
} from '../actions/SubmissionsStore'

import submissionController from '../../controllers/submission'

export const getSubmissionsRequest = (query) => (dispatch) => {
  dispatch(requestSubmissions())

  submissionController
    .fetchSubmissions(query)
    .then((submissions) => {
      dispatch(receiveSubmissions({ Values: submissions }))
    })
    .catch((error) => {
      dispatch(failSubmissionsRequest(error))
    })
}

export const createSubmissionRequest = (submission, resolve, reject) => (
  dispatch
) => {
  dispatch(requestSubmissions())

  submissionController
    .createSubmission(submission)
    .then((submission) => {
      dispatch(createSubmission({ Value: submission }))
      resolve()
    })
    .catch((error) => {
      dispatch(failSubmissionsRequest(error))
      reject()
    })
}

export const deleteSubmissionRequest = (_id, resolve, reject) => (dispatch) => {
  dispatch(requestSubmissions())

  submissionController
    .deleteSubmission(_id)
    .then(() => {
      dispatch(deleteSubmission({ Value: { _id } }))
      resolve()
    })
    .catch((error) => {
      dispatch(failSubmissionsRequest(error))
      reject()
    })
}

export const updateSubmissionRequest = (submission, resolve, reject) => (
  dispatch
) => {
  dispatch(requestSubmissions())

  submissionController
    .updateSubmission(submission)
    .then(() => {
      dispatch(updateSubmission({ Value: submission }))
      resolve()
    })
    .catch((error) => {
      dispatch(failSubmissionsRequest(error))
      reject()
    })
}
