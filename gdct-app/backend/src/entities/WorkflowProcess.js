export default class WorkflowProcessEntity {
  constructor(
    {
      workflowId,
      statusId,
      to
    }
  ) {
    this.workflowId = workflowId
    this.statusId = statusId
    this.to = to
  }
}