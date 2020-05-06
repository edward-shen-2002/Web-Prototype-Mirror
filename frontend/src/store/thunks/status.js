import {
  requestStatuses,
  failStatusesRequest,
  receiveStatuses,
  createStatus,
  deleteStatus,
  updateStatus
} from '../actions/StatusStore'

import statusController from '../../controllers/status'

export const getStatusesRequest = (query) => (dispatch) => {
  dispatch(requestStatuses())

  return statusController.fetchStatuses(query)
    .then((statuses) => dispatch(receiveStatuses({ Values: statuses })))
    .catch((error) => dispatch(failStatusesRequest(error)))
}

export const createStatusRequest = (status) => (dispatch) => {
  dispatch(requestStatuses())
  
  return statusController.createStatus(status)
    .then((status) => dispatch(createStatus({ Value: status })))
    .catch((error) => dispatch(failStatusesRequest(error)))
}

export const deleteStatusRequest = (_id) => (dispatch) => {
  dispatch(requestStatuses())

  return statusController.deleteStatus(_id)
    .then(() => dispatch(deleteStatus({ Value: { _id } })))
    .catch((error) => dispatch(failStatusesRequest(error)))
}

export const updateStatusRequest = (status) => (dispatch) => {
  dispatch(requestStatuses())

  return statusController.updateStatus(status)
    .then(() => dispatch(updateStatus({ Value: status })))
    .catch((error) => dispatch(failStatusesRequest(error)))
}