import { createReducer } from "../tools/setup"

import REQUEST_COAS from './common/REQUEST'
import RECEIVE_COAS from './common/RECEIVE'
import FAIL_COAS_REQUEST from './common/FAIL_REQUEST'
import CREATE_COA from './common/CREATE'
import DELETE_COA from './common/DELETE'
import UPDATE_COA from './common/UPDATE'
import RESET_COAS from './common/RESET'

const reducersMap = {
  REQUEST_COAS,
  RECEIVE_COAS,
  FAIL_COAS_REQUEST,
  CREATE_COA,
  DELETE_COA,
  UPDATE_COA,
  RESET_COAS
}

const defaultState = {
  response: {
    Values: []
  },
  error: null,
  isCallInProgress: false,
  isCOADialogOpen: false
}

const COAsStore = createReducer(defaultState, reducersMap)

export default COAsStore
