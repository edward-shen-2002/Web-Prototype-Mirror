import { createSlice } from '@reduxjs/toolkit'

import { REQUEST, FAIL_REQUEST } from '../common/REST/reducers'

const LOAD = (_state, { payload }) => ({
  ...state,
  isCallInProgress: false,
  workflow: payload,
})

const CLEAR = () => initialState

const reducers = {
  REQUEST,
  LOAD,
  CLEAR,
  FAIL_REQUEST,
}

const initialState = {
  workflow: undefined,
  isCallInProgress: false,
  error: undefined,
}

const WorkflowStore = createSlice({
  name: 'WORKFLOW',
  initialState,
  reducers,
})

export default WorkflowStore
