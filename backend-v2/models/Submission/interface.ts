import { Schema, Document } from 'mongoose'

interface ISubmission {
  name            : string
  organizationID  : Schema.Types.ObjectId
  templateID      : Schema.Types.ObjectId
  programID       : Schema.Types.ObjectId
  workbookData    : object
  phase           : string
  status          : string
  isPublished     : boolean
}

export default interface ISubmissionDocument extends ISubmission, Document {}