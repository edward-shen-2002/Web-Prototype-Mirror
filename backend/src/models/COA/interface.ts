import { Document } from 'mongoose'

export interface ICOA {
  // id: string
  name: string
  startDate: Date

}

export default interface ICOADocument
  extends ICOA,
    Document {}
