import { IId } from '../models/interface'

// https://medium.com/@erickwendel/generic-repository-with-typescript-and-node-js-731c10a1b98e
interface IWrite<T> {
  create(item: T): Promise<T>
  update(id: IId, item: T): Promise<T>
  delete(id: IId): Promise<T>
}

interface IRead<T> {
  find(item: T): Promise<T[]>
  findOne(id: IId): Promise<T>
}

interface IValidation<T> {
  validate(id: IId): Promise<void>
}

export interface IRepository<T> extends IWrite<T>, IRead<T>, IValidation<T> {}
