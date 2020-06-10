import IAppSysRepository from './interface'
import AppSysEntity from '../../entities/AppSys'
import BaseRepository from '../repository'
import AppSysModel from '../../models/AppSys'
import { IId } from '../../models/interface'

export default class ReportPeriodRepository extends BaseRepository<AppSysEntity>
  implements IAppSysRepository<AppSysEntity> {
  public async delete(id: IId): Promise<AppSysEntity> {
    return AppSysModel.findByIdAndDelete(id).then(
      (AppSys) => new AppSysEntity(AppSys.toObject())
    )
  }

  public async create(AppSys: AppSysEntity): Promise<AppSysEntity> {
    return AppSysModel.create(AppSys).then((AppSys) => new AppSysEntity(AppSys.toObject()))
  }

  public async update(id: IId, AppSys: AppSysEntity): Promise<AppSysEntity> {
    return AppSysModel.findByIdAndUpdate(id, AppSys).then(
      (AppSys) => new AppSysEntity(AppSys.toObject())
    )
  }

  public async find(query: AppSysEntity): Promise<AppSysEntity[]> {
    const realQuery = {}

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key]
    }

    //TODO: filter to be active
    return AppSysModel.find(realQuery).then((AppSyses) =>
      AppSyses.filter(AppSys => AppSys).map((AppSys) => new AppSysEntity(AppSys.toObject()))
    )
  }
}
