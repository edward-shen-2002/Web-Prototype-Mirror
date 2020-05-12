import { Document } from 'mongoose'
import { IId } from '../interface'

export interface ICOA {
  name: string
}

export default interface ICOADocument
  extends ICOA,
    Document {}
