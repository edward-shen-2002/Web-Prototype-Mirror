import REQUEST_COATREES from './common/REQUEST'
import RECEIVE_COATREES from './common/RECEIVE'
import FAIL_COATREES_REQUEST from './common/FAIL_REQUEST'
import CREATE_COATREE from './common/CREATE'
import DELETE_COATREE from './common/DELETE'
import UPDATE_COATREE from './common/UPDATE'
import RESET_COATREES from './common/RESET'
import { createReducer } from '../tools/setup'

const reducersMap = {
  REQUEST_COATREES,
  RECEIVE_COATREES,
  FAIL_COATREES_REQUEST,
  CREATE_COATREE,
  DELETE_COATREE,
  UPDATE_COATREE,
  RESET_COATREES
}

const defaultState = {
  response: {
    Values: []
  },
  error: null,
  isCallInProgress: false
}

const COATreeStore = createReducer(defaultState, reducersMap)

export default COATreeStore
