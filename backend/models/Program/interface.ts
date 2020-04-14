import { Document } from 'mongoose'

interface IProgram {
  name: string
  code: string
}

export default interface IProgramDocument extends IProgram, Document {}
