import { 
  requestSheetNamees, 
  failSheetNameesRequest, 
  receiveSheetNamees, 
  createSheetNamee, 
  deleteSheetNamee, 
  updateSheetNamee 
} from '../actions/SheetNameesStore'

import sheetNameeController from '../../controllers/sheetNamee'

export const getSheetNameesRequest = (query) => (dispatch) => {
  dispatch(requestSheetNamees())

  sheetNameeController.fetchSheetNamees(query)
    .then((sheetNamees) => {
      dispatch(receiveSheetNamees({ Values: sheetNamees }))
    })
    .catch((error) => {
      dispatch(failSheetNameesRequest(error))
    })
}

export const createSheetNameeRequest = (sheetNamee, resolve, reject) => (dispatch) => {
  dispatch(requestSheetNamees())
  
  sheetNameeController.createSheetNamee(sheetNamee)
    .then((sheetNamee) => {
      dispatch(createSheetNamee({ Value: sheetNamee }))
      resolve()
    })
    .catch((error) => {
      dispatch(failSheetNameesRequest(error))
      reject()
    })
}

export const deleteSheetNameeRequest = (_id, resolve, reject) => (dispatch) => {
  dispatch(requestSheetNamees())

  sheetNameeController.deleteSheetNamee(_id)
    .then(() => {
      dispatch(deleteSheetNamee({ Value: { _id } }))
      resolve()
    })
    .catch((error) => {
      dispatch(failSheetNameesRequest(error))
      reject()
    })
}

export const updateSheetNameeRequest = (sheetNamee, resolve, reject) => (dispatch) => {
  dispatch(requestSheetNamees())

  sheetNameeController.updateSheetNamee(sheetNamee)
    .then(() => {
      dispatch(updateSheetNamee({ Value: sheetNamee }))
      resolve()
    })
    .catch((error) => {
      dispatch(failSheetNameesRequest(error))
      reject()
    })
}