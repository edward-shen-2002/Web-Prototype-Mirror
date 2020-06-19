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
  chart: sampleChart
}

const UPDATE_WORKFLOW_CHART = (state, action) => {
  const chart = action.payload(state.chart)

  state.chart = chart

  return state
}

const reducers = {
  UPDATE_WORKFLOW_CHART
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