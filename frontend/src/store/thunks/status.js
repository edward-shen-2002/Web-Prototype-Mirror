import {
  requestStatuses,
  failStatusesRequest,
  receiveStatuses,
  createStatus,
  deleteStatus,
  updateStatus
} from '../actions/StatusesStore'

import statusController from '../../controllers/status'

export const getStatusesRequest = (query) => (dispatch) => {
  dispatch(requestStatuses())

  statusController.fetchStatuses(query)
    .then((statuses) => {
      dispatch(receiveStatuses({ Values: statuses }))
    })
    .catch((error) => {
      dispatch(failStatusesRequest(error))
    })
}

export const createStatusRequest = (status, resolve, reject) => (dispatch) => {
  dispatch(requestStatuses())
  
  statusController.createStatus(status)
    .then((status) => {
      dispatch(createStatus({ Value: status }))
      resolve()
    })
    .catch((error) => {
      dispatch(failStatusesRequest(error))
      reject()
    })
}

export const deleteStatusRequest = (_id, resolve, reject) => (dispatch) => {
  dispatch(requestStatuses())

  statusController.deleteStatus(_id)
    .then(() => {
      dispatch(deleteStatus({ Value: { _id } }))
      resolve()
    })
    .catch((error) => {
      dispatch(failStatusesRequest(error))
      reject()
    })
}

export const updateStatusRequest = (status, resolve, reject) => (dispatch) => {
  dispatch(requestStatuses())

  statusController.updateStatus(status)
    .then(() => {
      dispatch(updateStatus({ Value: status }))
      resolve()
    })
    .catch((error) => {
      dispatch(failStatusesRequest(error))
      reject()
    })
}