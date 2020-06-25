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
  let isSingleInitialNode = true
  startNodes.forEach((node) => {
    if(!endNodes.has(node)) {
      if(initialNode) {
        isSingleInitialNode = false
      } else {
        initialNode = node
      }
    }
  })
  
  if(!isSingleInitialNode || !Object.keys(workflowNodes).length) return dispatch(WorkflowStoreActions.UPDATE_WORKFLOW_ERROR('There must be only one starting node'))
  
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
  const workflowProcessesData = []
  const statusData = []

  for(let nodeId in workflowNodes) {
    const { type: { _id: statusId } } = workflowNodes[nodeId]
    statusData.push({ id: nodeId, statusId })
  }

  for(let linkId in linkMapSet) {
    workflowProcessesData.push(
      {
        id: linkId,
        statusId: workflowNodes[linkId].type._id,
        to: [...linkMapSet[linkId]].map(
          (toId) => (
            {
              id: toId,
              statusId: workflowNodes[toId].type._id
            }
          )
        )
      }
    )
  }

  return workflowController.createWorkflow({ workflow, workflowProcessesData, statusData })
    .catch((error) => dispatch(WorkflowStoreActions.UPDATE_WORKFLOW_ERROR(error)))
}