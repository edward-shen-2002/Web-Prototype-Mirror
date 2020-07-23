import { Schema, model } from 'mongoose';

const WorkflowModel = model(
  'Workflow',
  new Schema(
    {
      name: { type: String },
    },
    { minimize: false, autoIndex: true },
  ),
  'Workflow',
);

export default WorkflowModel;
