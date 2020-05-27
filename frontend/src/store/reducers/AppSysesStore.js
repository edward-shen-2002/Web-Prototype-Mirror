import { createReducer } from '../tools/setup'

import REQUEST_APPSYSES from './common/REQUEST'
import RECEIVE_APPSYSES from './common/RECEIVE'
import FAIL_APPSYSES_REQUEST from './common/FAIL_REQUEST'
import CREATE_APPSYS from './common/CREATE'
import DELETE_APPSYS from './common/DELETE'
import UPDATE_APPSYS from './common/UPDATE'
import RESET_APPSYSES from './common/RESET'

const reducersMap = {
  REQUEST_APPSYSES,
  RECEIVE_APPSYSES,
  FAIL_APPSYSES_REQUEST,
  CREATE_APPSYS,
  DELETE_APPSYS,
  UPDATE_APPSYS,
  RESET_APPSYSES,
}

const defaultState = {
  response: {
    Values: [],
  },
  error: null,
  isCallInProgress: false,
}

const AppSysesStore = createReducer(defaultState, reducersMap)

export default AppSysesStore
