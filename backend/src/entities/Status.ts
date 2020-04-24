import { IStatus } from '../models/Status/interface'

export default class Status {
  public name: string
  public description: string
  public isActive: boolean

  constructor({ name, description, isActive }: IStatus) {
    this.name = name
    this.description = description
    this.isActive = isActive
  }
}
