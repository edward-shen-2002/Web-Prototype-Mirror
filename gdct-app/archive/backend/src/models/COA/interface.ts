import { Document } from 'mongoose'

export interface ICOA {
  // id: string
  name: string
  startDate: Date
  COA: string
}

export default interface ICOADocument
  extends ICOA,
    Document {}
