import {
  requestSheetNames,
  failSheetNamesRequest,
  receiveSheetNames,
  createSheetName,
  deleteSheetName,
  updateSheetName,
} from '../actions/SheetNamesStore'

import sheetNameController from '../../controllers/sheetName'

export const getSheetNamesRequest = (query) => (dispatch) => {
  dispatch(requestSheetNames())

  sheetNameController
    .fetchSheetNames(query)
    .then((sheetNames) => {
      dispatch(receiveSheetNames({ Values: sheetNames }))
    })
    .catch((error) => {
      dispatch(failSheetNamesRequest(error))
    })
}

export const createSheetNameRequest = (sheetName, resolve, reject) => (
  dispatch
) => {
  dispatch(requestSheetNames())

  sheetNameController
    .createSheetName(sheetName)
    .then((sheetName) => {
      dispatch(createSheetName({ Value: sheetName }))
      resolve()
    })
    .catch((error) => {
      dispatch(failSheetNamesRequest(error))
      reject()
    })
}

export const deleteSheetNameRequest = (_id, resolve, reject) => (dispatch) => {
  dispatch(requestSheetNames())

  sheetNameController
    .deleteSheetName(_id)
    .then(() => {
      dispatch(deleteSheetName({ Value: { _id } }))
      resolve()
    })
    .catch((error) => {
      dispatch(failSheetNamesRequest(error))
      reject()
    })
}

export const updateSheetNameRequest = (sheetName, resolve, reject) => (
  dispatch
) => {
  dispatch(requestSheetNames())

  sheetNameController
    .updateSheetName(sheetName)
    .then(() => {
      dispatch(updateSheetName({ Value: sheetName }))
      resolve()
    })
    .catch((error) => {
      dispatch(failSheetNamesRequest(error))
      reject()
    })
}
