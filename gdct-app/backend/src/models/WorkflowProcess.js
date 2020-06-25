import { Schema, model } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

const WorkflowProcessModel = model(
  'WorkflowProcess',
  new Schema(
    {
      workflowId: { type: ObjectId, ref: 'Workflow' },
      statusId: { type: ObjectId, ref: 'Status' },
      to: [{ type: ObjectId, ref: 'WorkflowProcess' }]
    },
    { minimize: false, autoIndex: true }
  ),
  'WorkflowProcess'
)

export default WorkflowProcessModel
