import { IId } from "../../models/interface";
import ISubmissionEntity from "./interface";
import { ICompressedExcelState } from "../../@types/excel/state";

export default class SubmissionEntity {
  public _id?: IId
  public name?: string
  public organizationId?: IId
  public templateId?: IId
  public programId?: IId
  public workbookData?: ICompressedExcelState
  public phase?: string
  public status?: string
  public isPublished?: boolean

  constructor(
    {
      _id,
      name,
      organizationId,
      templateId,
      programId,
      workbookData,
      phase,
      status,
      isPublished
    }: ISubmissionEntity
  ) {
    this._id = _id 
    this.name = name 
    this.organizationId = organizationId 
    this.templateId = templateId 
    this.programId = programId 
    this.workbookData = workbookData 
    this.phase = phase 
    this.status = status 
    this.isPublished = isPublished
  }
}
