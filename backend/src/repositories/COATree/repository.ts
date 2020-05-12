import ICOATreeRepository from './interface'
import COATreeEntity from '../../entities/COATree'
import BaseRepository from '../repository'
import COATreeModel from '../../models/COATree'
import { IId } from '../../models/interface'

export default class ReportPeriodRepository extends BaseRepository<COATreeEntity>
  implements ICOATreeRepository<COATreeEntity> {
    public async delete(id: IId): Promise<COATreeEntity> {
      return COATreeModel.findByIdAndDelete(id).then(
        (COATree) => new COATreeEntity(COATree.toObject())
      )
    }
  
    public async create(COATree: COATreeEntity): Promise<COATreeEntity> {
      return COATreeModel.create(COATree).then((COATree) => new COATreeEntity(COATree.toObject()))
    }
  
    public async update(id: IId, COATree: COATreeEntity): Promise<COATreeEntity> {
      return COATreeModel.findByIdAndUpdate(id, COATree).then(
        (COATree) => new COATreeEntity(COATree.toObject())
      )
    }
  
    public async find(query: COATreeEntity): Promise<COATreeEntity[]> {
      const realQuery = {}
  
      for (const key in query) {
        if (query[key]) realQuery[key] = query[key]
      }
  
      return COATreeModel.find(realQuery).then((status) =>
        status.map((COATree) => new COATreeEntity(COATree.toObject()))
      )
    }
}
