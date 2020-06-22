import WorkflowStore from '../WorkflowsStore/store'
import workflowController from '../../controllers/workflow'
import { selectWorkflowLinks, selectWorkflowNodes } from '../WorkflowStore/selectors'

export const loadWorkflow = () => (dispatch) => {
  workflowController
    .fetchWorkflow()
    .then((workflow) => dispatch(WorkflowStore.actions.LOAD_WORKFLOW(workflow)))
    .catch((error) => dispatch(WorkflowStore.actions.FAIL_REQUEST(error)))
}

export const submitWorkflow = () => (dispatch, getState) => {
  const state = getState()
  
  const workflowNodes = selectWorkflowNodes(state)
  const workflowLinks = selectWorkflowLinks(state)

  const linkMapSet = {}

  for(let link of workflowLinks) {
    const { from, to } = workflowLinks[link]

    
  }
}