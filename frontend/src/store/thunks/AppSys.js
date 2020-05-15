import {
  requestAppSyses,
  failAppSysesRequest,
  receiveAppSyses,
  createAppSys,
  deleteAppSys,
  updateAppSys
} from '../actions/AppSysesStore'

import AppSysController from '../../controllers/AppSys'

export const getAppSysesRequest = (query) => (dispatch) => {
  dispatch(requestAppSyses())

  AppSysController.fetchAppSyses(query)
    .then((AppSyses) => {
      dispatch(receiveAppSyses({ Values: AppSyses }))
    })
    .catch((error) => {
      dispatch(failAppSysesRequest(error))
    })
}

export const createAppSysRequest = (AppSys, resolve, reject) => (dispatch) => {
  dispatch(requestAppSyses())

  AppSysController.createAppSys(AppSys)
    .then((AppSys) => {
      dispatch(createAppSys({ Value: AppSys }))
      resolve()
    })
    .catch((error) => {
      dispatch(failAppSysesRequest(error))
      reject()
    })
}

export const deleteAppSysRequest = (_id, resolve, reject) => (dispatch) => {
  dispatch(requestAppSyses())

  AppSysController.deleteAppSys(_id)
    .then(() => {
      dispatch(deleteAppSys({ Value: { _id } }))
      resolve()
    })
    .catch((error) => {
      dispatch(failAppSysesRequest(error))
      reject()
    })
}

export const updateAppSysRequest = (AppSys, resolve, reject) => (dispatch) => {
  dispatch(requestAppSyses())

  AppSysController.updateAppSys(AppSys)
    .then(() => {
      dispatch(updateAppSys({ Value: AppSys }))
      resolve()
    })
    .catch((error) => {
      dispatch(failAppSysesRequest(error))
      reject()
    })
}