import { Document } from 'mongoose'
import { IId } from '../interface'

export interface ISheetName {
  templateId: IId,
  name: string,
  isActive: boolean
}

export default interface ISheetNameDocument
  extends ISheetName,
    Document {}
