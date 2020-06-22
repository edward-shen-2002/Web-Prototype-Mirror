import { createSelector } from "reselect"

export const selectWorkflowStore = (state) => state.WorkflowStore

// BASE SELECTORS

export const selectWorkflowChart = createSelector(
  [selectWorkflowStore],
  (workflowStore) => workflowStore.chart
)

export const selectWorkflowFilter = createSelector(
  [selectWorkflowStore],
  (workflowStore) => workflowStore.filter
)

// CHART FILTER

export const selectSelectedWorkflowNode = createSelector(
  [selectWorkflowChart],
  (workflowChart) => workflowChart.selected
)

export const selectSelectedNodeId = createSelector(
  [selectSelectedWorkflowNode],
  (workflowNode) => workflowNode ? workflowNode.id : undefined
)

export const selectWorkflowNodes = createSelector(
  [selectWorkflowChart],
  (workflowChart) => workflowChart.nodes
)

export const selectWorkflowLinks = createSelector(
  [selectWorkflowChart],
  (workflowChart) => workflowChart.links
)

export const selectSelectedWorkflowNodeContent = createSelector(
  [selectWorkflowNodes, selectSelectedNodeId],
  (workflowNodes, selectedNodeId) => workflowNodes[selectedNodeId]
)

export const selectSelectedNodeType = createSelector(
  [selectSelectedWorkflowNodeContent],
  (selectedNode) => selectedNode ? selectedNode.type : undefined
)
