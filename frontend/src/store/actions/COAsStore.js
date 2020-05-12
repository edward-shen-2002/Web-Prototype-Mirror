import {
  FAIL_COAS_REQUEST,
  RECEIVE_COAS,
  REQUEST_COAS,
  CREATE_COA,
  DELETE_COA,
  UPDATE_COA
} from "./actionCreators"

export const failCOAsRequest = (error) => ({ type: FAIL_COAS_REQUEST, error })
export const receiveCOAs = (response) => ({ type: RECEIVE_COAS, response })
export const requestCOAs = () => ({ type: REQUEST_COAS })
export const createCOA = (response) => ({ type: CREATE_COA, response })
export const deleteCOA = (response) => ({ type: DELETE_COA, response })
export const updateCOA = (response) => ({ type: UPDATE_COA, response })