import WorkflowStore from '../WorkflowsStore/store'
import workflowController from '../../controllers/workflow'
import { selectWorkflowLinks, selectWorkflowNodes } from '../WorkflowStore/selectors'

export const loadWorkflow = () => (dispatch) => {
  workflowController
    .fetchWorkflow()
    .then((workflow) => dispatch(WorkflowStore.actions.LOAD_WORKFLOW(workflow)))
    .catch((error) => dispatch(WorkflowStore.actions.FAIL_REQUEST(error)))
}

const markVisitableNodes = (startingNode, linkMapSet, visited) => {
  console.log(startingNode, linkMapSet, visited)
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

  if(isInitialNodePresent) {
    let visited = new Set()

    markVisitableNodes(initialNode, linkMapSet, visited)

    let isGraphConnected = true
    for(let node in workflowNodes) {
      if(!visited.has(node)) {
        isGraphConnected = false
        break
      }
    }

    if(isGraphConnected) {
      console.log('connected graph')
    } else {
      console.error('isolated graphs')
    }
  } else {
    console.error('no initial node')
  }
}