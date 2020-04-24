import { Document } from 'mongoose'

export interface IOrganizationGroup {
  name: string
  isActive: boolean
}

export default interface IOrganizationGroupDocument
  extends IOrganizationGroup,
    Document {}
