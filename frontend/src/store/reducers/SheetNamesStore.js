import { createReducer } from "../tools/setup"

import REQUEST_SHEET_NAMES from './common/REQUEST'
import RECEIVE_SHEET_NAMES from './common/RECEIVE'
import FAIL_SHEET_NAMES_REQUEST from './common/FAIL_REQUEST'
import CREATE_SHEET_NAME from './common/CREATE'
import DELETE_SHEET_NAME from './common/DELETE'
import UPDATE_SHEET_NAME from './common/UPDATE'
import RESET_SHEET_NAMES from './common/RESET'

const reducersMap = {
  REQUEST_SHEET_NAMES,
  RECEIVE_SHEET_NAMES,
  FAIL_SHEET_NAMES_REQUEST,
  CREATE_SHEET_NAME,
  DELETE_SHEET_NAME,
  UPDATE_SHEET_NAME,
  RESET_SHEET_NAMES
}

const defaultState = {
  response: {
    Values: []
  },
  error: null,
  isCallInProgress: false
}

const SheetNamesStore = createReducer(defaultState, reducersMap)

export default SheetNamesStore
