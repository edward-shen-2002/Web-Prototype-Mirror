import WorkflowStore from '../WorkflowStore/store'
import workflowController from '../../controllers/workflow'

export const loadWorkflow = () => (dispatch) => {
  workflowController
    .fetchWorkflow()
    .then((workflow) => dispatch(WorkflowStore.actions.LOAD_WORKFLOW(workflow)))
    .catch((error) => dispatch(WorkflowStore.actions.FAIL_REQUEST(error)))
}
