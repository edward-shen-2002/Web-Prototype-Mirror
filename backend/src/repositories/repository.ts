import { IRepository } from "./interface";
import { Model, Document } from "mongoose";
import { IId } from '../models/interface'

export default abstract class BaseRepository<T> implements IRepository<T> {
  private _model: Model<Document>

  constructor(model: Model<Document>) {
    this._model = model
  }
  find(item: T): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: IId): Promise<T> {
    throw new Error("Method not implemented.");
  }

  create(item: T): Promise<void> {
    throw new Error("Method not implemented.");
  }

  update(id: IId, item: T): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async delete(id: IId): Promise<void> {
    return (
      this._model.findByIdAndRemove(id)
        .then(() => {})
    )
  }
  public async validate(id: IId): Promise<void> {
    return this._model.findById(id)
      .then(
        (document) => {
          if(!document) throw `${this._model.collection.name} not found`
        } 
      )
  }
}