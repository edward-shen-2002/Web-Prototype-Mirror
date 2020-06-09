export default class SubmissionEntity {
  constructor(
    {
      _id,
      name,
      organizationId,
      templateId,
      programId,
      workbookData,
      statusId,
      isPublished
    }
  ) {
    this._id = _id 
    this.name = name 
    this.organizationId = organizationId 
    this.templateId = templateId 
    this.programId = programId 
    this.workbookData = workbookData 
    this.statusId = statusId 
    this.isPublished = isPublished
  }
}
