import { createSelector } from "reselect"

export const selectWorkflowStore = (state) => state.WorkflowStore

export const selectWorkflowChart = createSelector(
  [selectWorkflowStore],
  (workflowStore) => workflowStore.chart
)
