import { Schema, model } from 'mongoose';

const SubmissionPhaseModel = model(
  'SubmissionPhase',
  new Schema(
    {
      name: { type: String },
      description: { type: String },
      isActive: { type: Boolean },
    },
    { minimize: false, autoIndex: true },
  ),
  'SubmissionPhase',
);

export default SubmissionPhaseModel;
