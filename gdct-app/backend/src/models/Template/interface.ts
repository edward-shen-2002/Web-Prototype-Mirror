import { Schema, Document } from 'mongoose'
import { IId } from '../interface'
import { ICompressedExcelState } from '../../@types/excel/state'

export interface ITemplate {
  name?: string
  templateData?: ICompressedExcelState
  templateTypeId?: IId
  userCreatorId?: IId
  creationDate?: Date
  expirationDate?: Date
  statusId?: IId
}

export default interface ITemplateDocument extends ITemplate, Document {}
