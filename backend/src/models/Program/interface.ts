import { Document } from 'mongoose'

export interface IProgram {
  name: string
  code: string
}

export default interface IProgramDocument extends IProgram, Document {}
