import {
  FAIL_SHEETNAMES_REQUEST,
  RECEIVE_SHEETNAMES,
  REQUEST_SHEETNAMES,
  CREATE_SHEETNAME,
  DELETE_SHEETNAME,
  UPDATE_SHEETNAME
} from "./actionCreators"

export const failSheetNamesRequest = (error) => ({ type: FAIL_SHEETNAMES_REQUEST, error })
export const receiveSheetNames = (response) => ({ type: RECEIVE_SHEETNAMES, response })
export const requestSheetNames = () => ({ type: REQUEST_SHEETNAMES })
export const createSheetName = (response) => ({ type: CREATE_SHEETNAME, response })
export const deleteSheetName = (response) => ({ type: DELETE_SHEETNAME, response })
export const updateSheetName = (response) => ({ type: UPDATE_SHEETNAME, response })
export const resetSheetNames = () => ({ type: RESET_SHEETNAMES, response })
