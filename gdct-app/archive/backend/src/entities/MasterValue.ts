import { IId } from "../models/interface"

export default class MasterValueEntity {
  public submissionId?: IId
  public COATreeId?: IId
  public COAId?: IId
  public columnNameId?: IId
  public value?: string

  constructor(
    {
      submissionId,
      COATreeId,
      COAId,
      columnNameId,
      value,
    }: MasterValueEntity
  ) {
    this.submissionId = submissionId
    this.COATreeId = COATreeId
    this.COAId = COAId
    this.columnNameId = columnNameId
    this.value = value
  }
}
