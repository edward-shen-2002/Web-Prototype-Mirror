import AppSysEntity from '../../entities/AppSys'
import BaseRepository from '../repository'
import AppSysModel from '../../models/AppSys'

export default class ReportPeriodRepository extends BaseRepository {
  async delete(id) {
    return AppSysModel.findByIdAndDelete(id).then(
      (AppSys) => new AppSysEntity(AppSys.toObject())
    )
  }

  async create(AppSys) {
    return AppSysModel.create(AppSys).then((AppSys) => new AppSysEntity(AppSys.toObject()))
  }

  async update(id, AppSys) {
    return AppSysModel.findByIdAndUpdate(id, AppSys).then(
      (AppSys) => new AppSysEntity(AppSys.toObject())
    )
  }

  async find(query) {
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
