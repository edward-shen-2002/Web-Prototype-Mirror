import { createReducer } from "../tools/setup"

import REQUEST_SHEETNAMES from './common/REQUEST'
import RECEIVE_SHEETNAMES from './common/RECEIVE'
import FAIL_SHEETNAMES_REQUEST from './common/FAIL_REQUEST'
import CREATE_SHEETNAME from './common/CREATE'
import DELETE_SHEETNAME from './common/DELETE'
import UPDATE_SHEETNAME from './common/UPDATE'
import RESET_SHEETNAMES from './common/RESET'

const reducersMap = {
  REQUEST_SHEETNAMES,
  RECEIVE_SHEETNAMES,
  FAIL_SHEETNAMES_REQUEST,
  CREATE_SHEETNAME,
  DELETE_SHEETNAME,
  UPDATE_SHEETNAME,
  RESET_SHEETNAMES
}

const defaultState = {
  response: {
    Values: []
  },
  error: null,
  isCallInProgress: false
}

const SheetNameStore = createReducer(defaultState, reducersMap)

export default SheetNameStore
