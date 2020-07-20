export default class MasterValueEntity {
  constructor(
    {
      submissionId,
      COATreeId,
      COAId,
      columnNameId,
      value,
    }
  ) {
    this.submissionId = submissionId
    this.COATreeId = COATreeId
    this.COAId = COAId
    this.columnNameId = columnNameId
    this.value = value
  }
}
