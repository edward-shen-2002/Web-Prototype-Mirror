import { Document } from 'mongoose'

interface IProgram {
  name: string
  code: string
}

export default interface IProgramModel extends IProgram, Document {}
