import { IRepository } from "./interface";
import { Model, Document } from "mongoose";
import { IId } from '../models/interface'

export default abstract class BaseRepository<T> implements IRepository<T> {
  private _model: Model<Document>

  constructor(model: Model<Document>) {
    this._model = model
  }

  create(item: T): Promise<void> {
    throw new Error("Method not implemented.");
  }

  update(id: IId, item: T): Promise<void> {
    throw new Error("Method not implemented.");
  }

  find(item: T): Promise<T[]> {
    return (
      this._model.find({ ...item })
        .then((documents) => documents.map((document) => new (document.toObject()) as T))
    )
  }

  public async delete(id: IId): Promise<void> {
    return (
      this._model.findByIdAndRemove(id)
        .then(() => {})
    )
  }

  public async findOne(id: IId): Promise<T> {
    return (
      this._model.findById(id)
        .then((document) => new (document.toObject()) as T)
    )
  }

  public async validate(id: IId): Promise<void> {
    return this._model.findById(id)
    .then(
      (document) => {
        if(!document) throw `${document.baseModelName} not found`
      } 
    )
  }
}