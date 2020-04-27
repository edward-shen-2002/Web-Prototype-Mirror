import { IRepository } from './interface'
import { Model, Document } from 'mongoose'
import { IId } from '../models/interface'

export default abstract class BaseRepository<T> implements IRepository<T> {
  private _model: Model<Document>

  constructor(model: Model<Document>) {
    this._model = model
  }
  delete(id: IId): Promise<T> {
    throw new Error('Method not implemented.')
  }
  find(item: T): Promise<T[]> {
    throw new Error('Method not implemented.')
  }
  findOne(id: IId): Promise<T> {
    throw new Error('Method not implemented.')
  }

  create(item: T): Promise<T> {
    throw new Error('Method not implemented.')
  }

  update(id: IId, item: T): Promise<T> {
    throw new Error('Method not implemented.')
  }
  public async validate(id: IId): Promise<void> {
    return this._model.findById(id).then((document) => {
      if (!document) throw `${this._model.collection.name} not found`
    })
  }

  public async validateMany(ids: Array<IId>): Promise<void> {
    return this._model
      .find({
        _id: {
          $in: ids,
        },
      })
      .then((documents) => {
        console.log(documents, ids)
        if (documents.length !== ids.length)
          throw `${this._model.collection.name}(s) not found`
      })
  }
}
