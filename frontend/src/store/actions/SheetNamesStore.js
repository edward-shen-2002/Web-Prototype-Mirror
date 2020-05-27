import {
  FAIL_SHEET_NAMES_REQUEST,
  RECEIVE_SHEET_NAMES,
  REQUEST_SHEET_NAMES,
  CREATE_SHEET_NAME,
  DELETE_SHEET_NAME,
  UPDATE_SHEET_NAME,
} from './actionTypes'

export const failSheetNamesRequest = (error) => ({
  type: FAIL_SHEET_NAMES_REQUEST,
  error,
})
export const receiveSheetNames = (response) => ({
  type: RECEIVE_SHEET_NAMES,
  response,
})
export const requestSheetNames = () => ({ type: REQUEST_SHEET_NAMES })
export const createSheetName = (response) => ({
  type: CREATE_SHEET_NAME,
  response,
})
export const deleteSheetName = (response) => ({
  type: DELETE_SHEET_NAME,
  response,
})
export const updateSheetName = (response) => ({
  type: UPDATE_SHEET_NAME,
  response,
})
export const resetSheetNames = () => ({ type: RESET_SHEET_NAMES, response })
