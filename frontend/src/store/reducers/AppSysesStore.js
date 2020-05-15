import { createReducer } from "../tools/setup"

import REQUEST_AppSyses from './common/REQUEST'
import RECEIVE_AppSyses from './common/RECEIVE'
import FAIL_AppSyses_REQUEST from './common/FAIL_REQUEST'
import CREATE_AppSys from './common/CREATE'
import DELETE_AppSys from './common/DELETE'
import UPDATE_AppSys from './common/UPDATE'
import RESET_AppSyses from './common/RESET'

const reducersMap = {
  REQUEST_AppSyses,
  RECEIVE_AppSyses,
  FAIL_AppSyses_REQUEST,
  CREATE_AppSys,
  DELETE_AppSys,
  UPDATE_AppSys,
  RESET_AppSyses
}

const defaultState = {
  response: {
    Values: []
  },
  error: null,
  isCallInProgress: false
}

const AppSysestore = createReducer(defaultState, reducersMap)

export default AppSysestore
