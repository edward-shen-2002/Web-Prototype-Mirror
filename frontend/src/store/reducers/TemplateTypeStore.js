import REQUEST_TEMPLATE_TYPES from './common/REQUEST'
import RECEIVE_TEMPLATE_TYPES from './common/RECEIVE'
import FAIL_TEMPLATE_TYPES_REQUEST from './common/FAIL_REQUEST'
import CREATE_TEMPLATE_TYPE from './common/CREATE'
import DELETE_TEMPLATE_TYPE from './common/DELETE'
import UPDATE_TEMPLATE_TYPE from './common/UPDATE'
import RESET_TEMPLATE_TYPES from './common/RESET'

const reducersMap = {
  REQUEST_TEMPLATE_TYPES,
  RECEIVE_TEMPLATE_TYPES,
  FAIL_TEMPLATE_TYPES_REQUEST,
  CREATE_TEMPLATE_TYPE,
  DELETE_TEMPLATE_TYPE,
  UPDATE_TEMPLATE_TYPE,
  RESET_TEMPLATE_TYPES
}

const defaultState = {
  response: {
    Values: []
  },
  error: null,
  isCallInProgress: false
}

const templateTypeStore = (state = defaultState, action) => {
  const reducer = reducersMap[action.type]

  return reducer ? reducer(state, action) : state
}

export default templateTypeStore
