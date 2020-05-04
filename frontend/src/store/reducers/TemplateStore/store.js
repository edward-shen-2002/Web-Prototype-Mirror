import REQUEST_TEMPLATES from '../common/REQUEST'
import RECEIVE_TEMPLATES from '../common/RECEIVE'
import FAIL_TEMPLATES_REQUEST from '../common/FAIL_REQUEST'
import CREATE_TEMPLATE from '../common/CREATE'
import DELETE_TEMPLATE from '../common/DELETE'
import UPDATE_TEMPLATE from '../common/UPDATE'

const reducersMap = {
  REQUEST_TEMPLATES,
  RECEIVE_TEMPLATES,
  FAIL_TEMPLATES_REQUEST,
  CREATE_TEMPLATE,
  DELETE_TEMPLATE,
  UPDATE_TEMPLATE
}

const defaultState = {
  response: {
    Values: []
  },
  error: null,
  isCallInProgress: false
}

const TemplateStore = (state = defaultState, action) => {
  const reducer = reducersMap[action.type]

  return reducer ? reducer(state, action) : state
}

export default TemplateStore
