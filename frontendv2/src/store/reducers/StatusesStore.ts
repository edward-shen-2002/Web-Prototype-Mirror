import { createReducer } from "../tools/setup"

import REQUEST_STATUSES from './common/REQUEST'
import RECEIVE_STATUSES from './common/RECEIVE'
import FAIL_STATUSES_REQUEST from './common/FAIL_REQUEST'
import CREATE_STATUS from './common/CREATE'
import DELETE_STATUS from './common/DELETE'
import UPDATE_STATUS from './common/UPDATE'
import RESET_STATUSES from './common/RESET'

const reducersMap = {
  REQUEST_STATUSES,
  RECEIVE_STATUSES,
  FAIL_STATUSES_REQUEST,
  CREATE_STATUS,
  DELETE_STATUS,
  UPDATE_STATUS,
  RESET_STATUSES
}

const defaultState = {
  response: {
    Values: []
  },
  error: null,
  isCallInProgress: false
}

const StatusStore = createReducer(defaultState, reducersMap)

export default StatusStore
