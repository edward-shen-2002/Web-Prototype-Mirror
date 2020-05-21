import { createReducer } from "../tools/setup"

import REQUEST_SUBMISSION_PERIODS from './common/REQUEST'
import RECEIVE_SUBMISSION_PERIODS from './common/RECEIVE'
import FAIL_SUBMISSION_PERIODS_REQUEST from './common/FAIL_REQUEST'
import CREATE_SUBMISSION_PERIOD from './common/CREATE'
import DELETE_SUBMISSION_PERIOD from './common/DELETE'
import UPDATE_SUBMISSION_PERIOD from './common/UPDATE'
import RESET_SUBMISSION_PERIODS from './common/RESET'

const reducersMap = {
  REQUEST_SUBMISSION_PERIODS,
  RECEIVE_SUBMISSION_PERIODS,
  FAIL_SUBMISSION_PERIODS_REQUEST,
  CREATE_SUBMISSION_PERIOD,
  DELETE_SUBMISSION_PERIOD,
  UPDATE_SUBMISSION_PERIOD,
  RESET_SUBMISSION_PERIODS
}

const defaultState = {
  response: {
    Values: []
  },
  error: null,
  isCallInProgress: false
}

const SubmissionPeriodsStore = createReducer(defaultState, reducersMap)

export default SubmissionPeriodsStore
