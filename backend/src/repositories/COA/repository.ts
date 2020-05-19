import ICOARepository from './interface'
import COAEntity from '../../entities/COA'
import BaseRepository from '../repository'
import COAModel from '../../models/COA'
import { IId } from '../../models/interface'

export default class ReportPeriodRepository extends BaseRepository<COAEntity>
  implements ICOARepository<COAEntity> {
    public async delete(id: IId): Promise<COAEntity> {
      return COAModel.findByIdAndDelete(id).then(
        (COA) => new COAEntity(COA.toObject())
      )
    }
  
    public async create(COA: COAEntity): Promise<COAEntity> {
      return COAModel.create(COA).then((COA) => new COAEntity(COA.toObject()))
    }
  
    public async update(id: IId, COA: COAEntity): Promise<COAEntity> {
      return COAModel.findByIdAndUpdate(id, COA).then(
        (COA) => new COAEntity(COA.toObject())
      )
    }
  
    public async find(query: COAEntity): Promise<COAEntity[]> {
      const realQuery = {}
  
      for (const key in query) {
        if (query[key]) realQuery[key] = query[key]
      }
  
      return COAModel.find({}).then((COAs) => {
        console.log(COAs)
        return COAs.map((COA) => new COAEntity(COA.toObject()))
      }
      )
    }
}
