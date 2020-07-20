export default class TemplatePackageEntity {
  constructor({
    _id,
    name,
    submissionPeriodId,
    templateIds,
    statusId,
    creationDate,
    userCreatorId,
  }) {
    this._id = _id;
    this.name = name;
    this.submissionPeriodId = submissionPeriodId;
    this.templateIds = templateIds;
    this.statusId = statusId;
    this.creationDate = creationDate;
    this.userCreatorId = userCreatorId;
  }
}
