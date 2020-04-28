import { IId } from '../models/interface'

export default class User {
  public _id?: IId
  public username?: string
  public email?: string
  public title?: string
  public firstName?: string
  public lastName?: string
  public phoneNumber?: string
  public organizations?: object
  public isActive?: boolean
  public isEmailVerified?: boolean
  public isApproved?: boolean
  public creationDate?: Date
  public approvedDate?: Date

  constructor({
    _id,
    username,
    email,
    title,
    firstName,
    lastName,
    phoneNumber,
    organizations,
    isActive,
    isEmailVerified,
    isApproved,
    creationDate,
    approvedDate
  }) {
    this._id = _id
    this.username = username
    this.email = email
    this.title = title
    this.firstName = firstName
    this.lastName = lastName
    this.phoneNumber = phoneNumber
    this.organizations = organizations
    this.isActive = isActive
    this.isEmailVerified = isEmailVerified
    this.isApproved = isApproved
    this.creationDate = creationDate
    this.approvedDate = approvedDate
  }
}
