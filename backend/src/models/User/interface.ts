import { Document } from 'mongoose'

export interface IUser {
  username: string

  email: string

  title: string

  firstName: string
  lastName: string

  phoneNumber: string

  organizations: object

  isActive: boolean
  isEmailVerified: boolean
  isApproved: boolean

  creationDate: Date
  approvedDate: Date
}

export default interface IUserDocument extends IUser, Document {}
