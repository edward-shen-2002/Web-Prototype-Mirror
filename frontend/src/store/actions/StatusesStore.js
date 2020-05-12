import {
  FAIL_STATUSES_REQUEST,
  RECEIVE_STATUSES,
  REQUEST_STATUSES,
  CREATE_STATUS,
  DELETE_STATUS,
  UPDATE_STATUS
} from "./actionCreators"

export const failStatusesRequest = (error) => ({ type: FAIL_STATUSES_REQUEST, error })
export const receiveStatuses = (response) => ({ type: RECEIVE_STATUSES, response })
export const requestStatuses = () => ({ type: REQUEST_STATUSES })
export const createStatus = (response) => ({ type: CREATE_STATUS, response })
export const deleteStatus = (response) => ({ type: DELETE_STATUS, response })
export const updateStatus = (response) => ({ type: UPDATE_STATUS, response })