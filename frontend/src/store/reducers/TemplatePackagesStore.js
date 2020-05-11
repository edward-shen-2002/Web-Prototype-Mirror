import { createReducer } from "../tools/setup"

import REQUEST_TEMPLATE_PACKAGES from './common/REQUEST'
import RECEIVE_TEMPLATE_PACKAGES from './common/RECEIVE'
import FAIL_TEMPLATE_PACKAGES_REQUEST from './common/FAIL_REQUEST'
import CREATE_TEMPLATE_PACKAGE from './common/CREATE'
import DELETE_TEMPLATE_PACKAGE from './common/DELETE'
import UPDATE_TEMPLATE_PACKAGE from './common/UPDATE'
import RESET_TEMPLATE_PACKAGES from './common/RESET'

const reducersMap = {
  REQUEST_TEMPLATE_PACKAGES,
  RECEIVE_TEMPLATE_PACKAGES,
  FAIL_TEMPLATE_PACKAGES_REQUEST,
  CREATE_TEMPLATE_PACKAGE,
  DELETE_TEMPLATE_PACKAGE,
  UPDATE_TEMPLATE_PACKAGE,
  RESET_TEMPLATE_PACKAGES
}

const defaultState = {
  response: {
    Values: []
  },
  error: null,
  isCallInProgress: false
}

const TemplatePackageStore = createReducer(defaultState, reducersMap)

export default TemplatePackageStore
