import { createReducer } from "../tools/setup"

import REQUEST_COA_GROUPS from './common/REQUEST'
import RECEIVE_COA_GROUPS from './common/RECEIVE'
import FAIL_COA_GROUPS_REQUEST from './common/FAIL_REQUEST'
import CREATE_COA_GROUP from './common/CREATE'
import DELETE_COA_GROUP from './common/DELETE'
import UPDATE_COA_GROUP from './common/UPDATE'
import RESET_COA_GROUPS from './common/RESET'

const reducersMap = {
  REQUEST_COA_GROUPS,
  RECEIVE_COA_GROUPS,
  FAIL_COA_GROUPS_REQUEST,
  CREATE_COA_GROUP,
  DELETE_COA_GROUP,
  UPDATE_COA_GROUP,
  RESET_COA_GROUPS
}

const defaultState = {
  response: {
    Values: []
  },
  error: null,
  isCallInProgress: false
}

const COAGroupsStore = createReducer(defaultState, reducersMap)

export default COAGroupsStore
