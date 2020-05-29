import { Document } from 'mongoose'
import { IId } from '../interface'

export interface ICOAGroup {
  name: string
  code: string
  isActive: boolean
}

export default interface ICOAGroupDocument
  extends ICOAGroup,
    Document {}
