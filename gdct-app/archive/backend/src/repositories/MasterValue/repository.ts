import IMasterValueRepository from './interface'
import MasterValueEntity from '../../entities/MasterValue'
import BaseRepository from '../repository'
import MasterValueModel from '../../models/MasterValue'
import { IId } from '../../models/interface'

export default class MasterValueRepository extends BaseRepository<MasterValueEntity>
  implements IMasterValueRepository<MasterValueEntity> {
  
  constructor() {
    super(MasterValueModel)
  }

  public async bulkUpdate(submissionId: IId, masterValues: MasterValueEntity[]) {
    return MasterValueModel.deleteMany({ submissionId })
      .then(() => MasterValueModel.create(masterValues))
  }

  // public async updateMany(submissionId: IId, masterValues: MasterValueEntity[]) {
  //   return MasterValueModel.updateMany(
  //     masterValues,
      
  //   )
  // }
}
