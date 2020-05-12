import ICOAGroupRepository from './interface'
import COAGroupEntity from '../../entities/COAGroup'
import BaseRepository from '../repository'
import COAGroupModel from '../../models/COAGroup'
import { IId } from '../../models/interface'

export default class ReportPeriodRepository extends BaseRepository<COAGroupEntity>
  implements ICOAGroupRepository<COAGroupEntity> {
    public async delete(id: IId): Promise<COAGroupEntity> {
      return COAGroupModel.findByIdAndDelete(id).then(
        (COAGroup) => new COAGroupEntity(COAGroup.toObject())
      )
    }
  
    public async create(COAGroup: COAGroupEntity): Promise<COAGroupEntity> {
      return COAGroupModel.create(COAGroup).then((COAGroup) => new COAGroupEntity(COAGroup.toObject()))
    }
  
    public async update(id: IId, COAGroup: COAGroupEntity): Promise<COAGroupEntity> {
      return COAGroupModel.findByIdAndUpdate(id, COAGroup).then(
        (COAGroup) => new COAGroupEntity(COAGroup.toObject())
      )
    }
  
    public async find(query: COAGroupEntity): Promise<COAGroupEntity[]> {
      const realQuery = {}
  
      for (const key in query) {
        if (query[key]) realQuery[key] = query[key]
      }
  
      return COAGroupModel.find(realQuery).then((status) =>
        status.map((COAGroup) => new COAGroupEntity(COAGroup.toObject()))
      )
    }
}
