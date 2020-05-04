import REQUEST_STATUSES from '../common/REQUEST'
import RECEIVE_STATUSES from '../common/RECEIVE'
import FAIL_STATUSES_REQUEST from '../common/FAIL_REQUEST'
import CREATE_STATUS from '../common/CREATE'
import DELETE_STATUS from '../common/DELETE'
import UPDATE_STATUS from '../common/UPDATE'

const reducersMap = {
  REQUEST_STATUSES,
  RECEIVE_STATUSES,
  FAIL_STATUSES_REQUEST,
  CREATE_STATUS,
  DELETE_STATUS,
  UPDATE_STATUS
}

const defaultState = {
  response: {
    Values: []
  },
  error: null,
  isCallInProgress: false
}

const StatusStore = (state = defaultState, action) => {
  const reducer = reducersMap[action.type]

  return reducer ? reducer(state, action) : state
}

export default StatusStore
