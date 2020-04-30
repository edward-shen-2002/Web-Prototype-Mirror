import { Schema, Document } from 'mongoose'

export interface IAppSys {
  id              : number

  code            : string

  name            : string

}

export default interface IAppSysDocument extends IAppSys, Document {}
