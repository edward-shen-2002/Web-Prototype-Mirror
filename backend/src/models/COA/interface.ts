import { Document } from 'mongoose'

export interface ICOA {
  name: string
}

export default interface ICOADocument
  extends ICOA,
    Document {}
