import { Document } from 'mongoose'
import { IId } from '../interface';

export interface IProgram {
  // id              : number
  name            : string
  code            : string

  organizationIds : Array<IId>

  isActive        : boolean
}

export default interface IProgramDocument extends IProgram, Document {}
