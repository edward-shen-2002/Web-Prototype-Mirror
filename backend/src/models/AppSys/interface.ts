import { Document } from 'mongoose'

export interface IAppSys {
  code: string
  name: string
}

export default interface IAppSysDocument extends IAppSys, Document {}
