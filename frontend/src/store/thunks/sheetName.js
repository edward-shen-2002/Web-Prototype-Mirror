import sheetNameController from '../../controllers/sheetName'
import SheetNamesStore from '../SheetNamesStore'

export const getSheetNamesRequest = (query) => (dispatch) => {
  dispatch(SheetNamesStore.actions.REQUEST())

  sheetNameController
    .fetchSheetNames(query)
    .then((sheetNames) => {
      dispatch(SheetNamesStore.actions.RECEIVE({ response: { Values: sheetNames } }))
    })
    .catch((error) => {
      dispatch(SheetNamesStore.actions.FAIL_REQUEST({ error }))
    })
}

export const createSheetNameRequest = (sheetName, resolve, reject) => (
  dispatch
) => {
  dispatch(SheetNamesStore.actions.REQUEST())

  sheetNameController
    .createSheetName(sheetName)
    .then((sheetName) => {
      dispatch(SheetNamesStore.actions.CREATE({ response: { Value: sheetName } }))
      resolve()
    })
    .catch((error) => {
      console.error(error)
      dispatch(SheetNamesStore.actions.FAIL_REQUEST({ error }))
      reject()
    })
}

export const deleteSheetNameRequest = (_id, resolve, reject) => (dispatch) => {
  SheetNamesStore.action
  dispatch(SheetNamesStore.actions.REQUEST())

  sheetNameController
    .deleteSheetName(_id)
    .then(() => {
      dispatch(SheetNamesStore.actions.DELETE({ response: { Value: { _id } } }))
      resolve()
    })
    .catch((error) => {
      dispatch(SheetNamesStore.actions.FAIL_REQUEST({ error }))
      reject()
    })
}

export const updateSheetNameRequest = (sheetName, resolve, reject) => (
  dispatch
) => {
  dispatch(SheetNamesStore.actions.REQUEST())

  sheetNameController
    .updateSheetName(sheetName)
    .then(() => {
      dispatch(SheetNamesStore.actions.UPDATE({ response: { Value: sheetName } }))
      resolve()
    })
    .catch((error) => {
      dispatch(SheetNamesStore.actions.FAIL_REQUEST({ error }))
      reject()
    })
}
