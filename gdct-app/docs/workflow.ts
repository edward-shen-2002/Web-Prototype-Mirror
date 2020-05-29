type IWorkflowProcessId = number
type ISubmissionId = number
type IWorkflowId = number
type IStatusId = number
type IAppSysId = number
type IWorkflowPhaseId = number

interface ISubmission {
  workflowId: IWorkflowId
  currentWorkflowProcessId: IWorkflowProcessId
  workflowProcessIdHistory: Array<IWorkflowProcessId>
}

interface IWorkflowPhase {
  name: string
}

// Non transition workflow data
// workflow and workflowProcess represents the entire workflow structure
// They're separated to normalize data
interface IWorkflow {
  initialWorkflowProcessId: IWorkflowProcessId,
  finalWorkflowProcessIds: Array<IWorkflowProcessId> 
}

// Workflow phase transitions
interface IWorkflowProcess {
  workflowId: IWorkflowId
  workflowPhaseId: IWorkflowPhaseId,
  to: Array<IWorkflowProcessId>,
  appSysRoleId: IAppSysId
}