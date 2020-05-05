import { Document } from 'mongoose'

export interface IUser {
  // id              : number
  username        : string

  email           : string

  title           : string

  firstName       : string
  lastName        : string

  phoneNumber     : string

  // organizations   : object

  active          : boolean
  isVerified      : boolean

  createDate      : Date
  approveDate     : Date

  startDate       : Date
  endDate         : Date
}

export default interface IUserDocument extends IUser, Document {}
