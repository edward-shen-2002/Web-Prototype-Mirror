import { createSlice } from '@reduxjs/toolkit'

const sampleChart = {
  offset: {
    x: 200,
    y: 200,
  },
  scale: 1,
  nodes: {},
  links: {},
  selected: {},
  hovered: {},
}

const initialState = {
  chart: sampleChart,
  filter: '',
  name: '',
}

const UPDATE_WORKFLOW_CHART = (state, action) => {
  const chart = action.payload(state.chart)

  state.chart = chart

  return state
}

const UPDATE_WORKFLOW_FILTER = (state, action) => {
  state.filter = action.payload
  return state
}

const UPDATE_WORKFLOW_NAME = (state, action) => {
  state.name = action.payload
  return state
}

const reducers = {
  UPDATE_WORKFLOW_CHART,
  UPDATE_WORKFLOW_FILTER,
  UPDATE_WORKFLOW_NAME,
}

export const WorkflowStore = createSlice(
  {
    name: 'WORKFLOW',
    reducers,
    initialState
  }
)

export const WorkflowStoreActions = WorkflowStore.actions

export default WorkflowStore