import { IId } from '../../models/interface'
import ICOATreeEntity from './interface'

export default class COATreeEntity {
  public _id?: IId

  constructor(
    { 
      _id,

    }: ICOATreeEntity) {
      this._id = _id

  }
}
