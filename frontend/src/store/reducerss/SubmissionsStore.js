import { createReducer } from '../tools/setup'

import REQUEST_SUBMISSIONS from './common/REQUEST'
import RECEIVE_SUBMISSIONS from './common/RECEIVE'
import FAIL_SUBMISSIONS_REQUEST from './common/FAIL_REQUEST'
import CREATE_SUBMISSION from './common/CREATE'
import DELETE_SUBMISSION from './common/DELETE'
import UPDATE_SUBMISSION from './common/UPDATE'
import RESET_SUBMISSIONS from './common/RESET'

const reducersMap = {
  REQUEST_SUBMISSIONS,
  RECEIVE_SUBMISSIONS,
  FAIL_SUBMISSIONS_REQUEST,
  CREATE_SUBMISSION,
  DELETE_SUBMISSION,
  UPDATE_SUBMISSION,
  RESET_SUBMISSIONS,
}

const defaultState = {
  response: {
    Values: [],
  },
  error: null,
  isCallInProgress: false,
}

const SubmissionPeriodsStore = createReducer(defaultState, reducersMap)

export default SubmissionPeriodsStore
