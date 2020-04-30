import { Document } from 'mongoose'

export interface IUser {
  username: string

  email: string

  title: string

  firstName: string
  lastName: string

  phoneNumber: string

  isActive: boolean
  isEmailVerified: boolean

  creationDate: Date
  approvedDate: Date

  startDate: Date
  endDate: Date
}

export default interface IUserDocument extends IUser, Document {}
