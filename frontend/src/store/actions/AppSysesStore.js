import {
  FAIL_APPSYSES_REQUEST,
  RECEIVE_APPSYSES,
  REQUEST_APPSYSES,
  CREATE_APPSYS,
  DELETE_APPSYS,
  UPDATE_APPSYS
} from "./actionCreators"

export const failAppSysesRequest = (error) => ({ type: FAIL_APPSYSES_REQUEST, error })
export const receiveAppSyses = (response) => ({ type: RECEIVE_APPSYSES, response })
export const requestAppSyses = () => ({ type: REQUEST_APPSYSES })
export const createAppSys = (response) => ({ type: CREATE_APPSYS, response })
export const deleteAppSys = (response) => ({ type: DELETE_APPSYS, response })
export const updateAppSys = (response) => ({ type: UPDATE_APPSYS, response })