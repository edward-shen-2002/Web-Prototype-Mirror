import ICOATreeRepository from './interface'
import COATreeEntity from '../../entities/COATree'
import BaseRepository from '../repository'
import COATreeModel from '../../models/COATree'
import { IId } from '../../models/interface'

import { Types } from 'mongoose'

const ObjectId = Types.ObjectId

export default class ReportPeriodRepository extends BaseRepository<COATreeEntity>
  implements ICOATreeRepository<COATreeEntity> {
    constructor() {
      super(COATreeModel)
    }

    public async delete(id: IId): Promise<COATreeEntity> {
      return COATreeModel.findByIdAndDelete(id).then(
        (COATree) => new COATreeEntity(COATree.toObject())
      )
    }
  
    public async create(COATree: COATreeEntity): Promise<COATreeEntity> {
      return COATreeModel.create(COATree).then((COATree) => COATree.populate('COAGroupId').execPopulate())
      .then((COATree) => new COATreeEntity(COATree.toObject()))
    }
  
    public async update(id: IId, COATree: COATreeEntity): Promise<COATreeEntity> {
      return COATreeModel.findByIdAndUpdate(id, COATree).then(
        (COATree) => new COATreeEntity(COATree.toObject())
      )
    }

    public async updateBySheet(sheetNameId: IId, COATrees: COATreeEntity[]): Promise<COATreeEntity[]> {
      return (
        COATreeModel.deleteMany(
          {
            sheetNameId
          }
        )
      )
      .then(() => COATreeModel.create(COATrees))
      .then((COATrees) => COATrees.map((COATree) => new COATreeEntity(COATree.toObject())))
    }
  
    public async find(query: COATreeEntity): Promise<COATreeEntity[]> {
      const realQuery = {}
  
      for (const key in query) {
        if (query[key]) realQuery[key] = query[key]
      }

      return COATreeModel.find(realQuery).populate('COAGroupId').exec().then((COATrees) => {
        return COATrees.map((COATree) => new COATreeEntity(COATree.toObject()))
      }
      )
    }
}
