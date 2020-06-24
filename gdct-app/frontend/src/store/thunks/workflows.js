import WorkflowStore from '../WorkflowsStore/store'
import workflowController from '../../controllers/workflow'
import { selectWorkflowLinks, selectWorkflowNodes, selectWorkflowName } from '../WorkflowStore/selectors'
import { WorkflowStoreActions } from '../WorkflowStore/store'

export const loadWorkflow = () => (dispatch) => {
  workflowController
    .fetchWorkflow()
    .then((workflow) => dispatch(WorkflowStore.actions.LOAD_WORKFLOW(workflow)))
    .catch((error) => dispatch(WorkflowStore.actions.FAIL_REQUEST(error)))
}

const markVisitableNodes = (startingNode, linkMapSet, visited) => {
  visited.add(startingNode)
  const adjacentNodes = linkMapSet[startingNode]

  if(adjacentNodes) {
    adjacentNodes.forEach(
      (adjacentNode) => {
        if(!visited.has(adjacentNode)) markVisitableNodes(adjacentNode, linkMapSet, visited)
      }
    )
  }
}

export const submitWorkflow = () => (dispatch, getState) => {
  const state = getState()
  
  const workflowNodes = selectWorkflowNodes(state)
  const workflowLinks = selectWorkflowLinks(state)
  const workflowName = selectWorkflowName(state)

  const linkMapSet = {}
  const endNodes = new Set()
  const startNodes = new Set()

  for(let link in workflowLinks) {
    const { from, to } = workflowLinks[link]
    const fromId = from.nodeId
    const toId = to.nodeId

    if(!linkMapSet[fromId]) linkMapSet[fromId] = new Set()

    linkMapSet[fromId].add(toId)
    endNodes.add(toId)
    startNodes.add(fromId)
  }

  let initialNode = null
  let isInitialNodePresent = true
  startNodes.forEach((node) => {
    if(!endNodes.has(node)) {
      if(initialNode) {
        isInitialNodePresent = false
      } else {
        initialNode = node
      }
    }
  })
  
  if(!isInitialNodePresent || !Object.keys(workflowNodes).length) return dispatch(WorkflowStoreActions.UPDATE_WORKFLOW_ERROR('There must be a starting node'))
  
  let visited = new Set()

  markVisitableNodes(initialNode, linkMapSet, visited)

  let isGraphConnected = true
  for(let node in workflowNodes) {
    if(!visited.has(node)) {
      isGraphConnected = false
      break
    }
  }

  if(!isGraphConnected) return dispatch(WorkflowStoreActions.UPDATE_WORKFLOW_ERROR('Graphs must be connected and have at least two nodes'))

  // Create the data structure of workflow process

  const workflow = { name: workflowName }
  const workflowProcesses = []

  for(let linkId in linkMapSet) {
    workflowProcesses.push(
      {
        statusId: workflowNodes[linkId].type._id,
        to: [...linkMapSet[linkId]].map(
          (toId) => workflowNodes[toId].type._id
        )
      }
    )
  }

  workflowController.createWorkflow({ workflow, workflowProcesses })
    .catch((error) => dispatch(WorkflowStoreActions.UPDATE_WORKFLOW_ERROR(error)))
}