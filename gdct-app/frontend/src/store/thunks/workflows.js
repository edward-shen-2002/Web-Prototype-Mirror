import WorkflowStore from '../WorkflowsStore/store'
import workflowController from '../../controllers/workflow'
import { selectWorkflowLinks } from '../WorkflowStore/selectors'

export const loadWorkflow = () => (dispatch) => {
  workflowController
    .fetchWorkflow()
    .then((workflow) => dispatch(WorkflowStore.actions.LOAD_WORKFLOW(workflow)))
    .catch((error) => dispatch(WorkflowStore.actions.FAIL_REQUEST(error)))
}

export const submitWorkflow = () => (dispatch, getState) => {
  const state = getState()

  const workflowLinks = selectWorkflowLinks(state)

   
}