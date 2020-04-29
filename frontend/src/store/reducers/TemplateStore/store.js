import REQUEST_TEMPLATES from './REQUEST_TEMPLATES'
import RECEIVE_TEMPLATES from './RECEIVE_TEMPLATES'
import FAIL_TEMPLATES_REQUEST from './FAIL_TEMPLATES_REQUEST'
import CREATE_TEMPLATE from './CREATE_TEMPLATE'
import DELETE_TEMPLATE from './DELETE_TEMPLATE'
import UPDATE_TEMPLATE from './UPDATE_TEMPLATE'

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

const TemplatesStore = (state = defaultState, action) => {
  const reducer = reducersMap[action.type]

  return reducer ? reducer(state, action) : state
}

export default TemplatesStore
