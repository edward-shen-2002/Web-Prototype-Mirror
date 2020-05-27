import { createReducer } from '../tools/setup'

import REQUEST_REPORTING_PERIODS from './common/REQUEST'
import RECEIVE_REPORTING_PERIODS from './common/RECEIVE'
import FAIL_REPORTING_PERIODS_REQUEST from './common/FAIL_REQUEST'
import CREATE_REPORTING_PERIOD from './common/CREATE'
import DELETE_REPORTING_PERIOD from './common/DELETE'
import UPDATE_REPORTING_PERIOD from './common/UPDATE'
import RESET_REPORTING_PERIODS from './common/RESET'

const reducersMap = {
  REQUEST_REPORTING_PERIODS,
  RECEIVE_REPORTING_PERIODS,
  FAIL_REPORTING_PERIODS_REQUEST,
  CREATE_REPORTING_PERIOD,
  DELETE_REPORTING_PERIOD,
  UPDATE_REPORTING_PERIOD,
  RESET_REPORTING_PERIODS,
}

const defaultState = {
  response: {
    Values: [],
  },
  error: null,
  isCallInProgress: false,
}

const ReportingPeriodsStore = createReducer(defaultState, reducersMap)

export default ReportingPeriodsStore
