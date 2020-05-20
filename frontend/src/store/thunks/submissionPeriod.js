import { 
  requestSubmissionPeriods, 
  failSubmissionPeriodsRequest, 
  receiveSubmissionPeriods, 
  createSubmissionPeriod, 
  deleteSubmissionPeriod, 
  updateSubmissionPeriod 
} from '../actions/SubmissionPeriodsStore'

import submissionPeriodController from '../../controllers/submissionPeriod'

export const getSubmissionPeriodsRequest = (query) => (dispatch) => {
  dispatch(requestSubmissionPeriods())

  submissionPeriodController.fetchSubmissionPeriods(query)
    .then((submissionPeriods) => {
      dispatch(receiveSubmissionPeriods({ Values: submissionPeriods }))
    })
    .catch((error) => {
      dispatch(failSubmissionPeriodsRequest(error))
    })
}

export const createSubmissionPeriodRequest = (submissionPeriod, resolve, reject) => (dispatch) => {
  dispatch(requestSubmissionPeriods())
  
  submissionPeriodController.createSubmissionPeriod(submissionPeriod)
    .then((submissionPeriod) => {
      dispatch(createSubmissionPeriod({ Value: submissionPeriod }))
      resolve()
    })
    .catch((error) => {
      dispatch(failSubmissionPeriodsRequest(error))
      reject()
    })
}

export const deleteSubmissionPeriodRequest = (_id, resolve, reject) => (dispatch) => {
  dispatch(requestSubmissionPeriods())

  submissionPeriodController.deleteSubmissionPeriod(_id)
    .then(() => {
      dispatch(deleteSubmissionPeriod({ Value: { _id } }))
      resolve()
    })
    .catch((error) => {
      dispatch(failSubmissionPeriodsRequest(error))
      reject()
    })
}

export const updateSubmissionPeriodRequest = (submissionPeriod, resolve, reject) => (dispatch) => {
  dispatch(requestSubmissionPeriods())

  submissionPeriodController.updateSubmissionPeriod(submissionPeriod)
    .then(() => {
      dispatch(updateSubmissionPeriod({ Value: submissionPeriod }))
      resolve()
    })
    .catch((error) => {
      dispatch(failSubmissionPeriodsRequest(error))
      reject()
    })
}