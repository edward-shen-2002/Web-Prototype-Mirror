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

  statusController.fetchStatuses(query)
    .then((statuses) => dispatch(receiveStatuses({ Values: statuses })))
    .catch((error) => dispatch(failStatusesRequest(error)))
}

export const createStatusRequest = (status) => (dispatch) => {
  dispatch(requestStatuses())
  
  statusController.createStatus(status)
    .then((status) => dispatch(createStatus({ Value: status })))
    .catch((error) => dispatch(failStatusesRequest(error)))
}

export const deleteStatusRequest = (_id) => (dispatch) => {
  dispatch(requestStatuses())

  statusController.deleteStatus(_id)
    .then(() => dispatch(deleteStatus({ Value: { _id } })))
    .catch((error) => dispatch(failStatusesRequest(error)))
}

export const updateStatusRequest = (status) => (dispatch) => {
  dispatch(requestStatuses())

  statusController.updateStatus(status)
    .then(() => dispatch(updateStatus({ Value: status })))
    .catch((error) => dispatch(failStatusesRequest(error)))
}