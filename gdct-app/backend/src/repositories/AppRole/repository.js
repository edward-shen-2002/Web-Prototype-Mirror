import AppRoleEntity from '../../entities/AppRole'
import BaseRepository from '../repository'
import AppRoleModel from '../../models/AppRole'

export default class ReportPeriodRepository extends BaseRepository {
  async delete(id) {
    return AppRoleModel.findByIdAndDelete(id).then(
      (AppRole) => new AppRoleEntity(AppRole.toObject())
    )
  }

  async create(AppRole) {
    return AppRoleModel.create(AppRole).then((AppRole) => new AppRoleEntity(AppRole.toObject()))
  }

  async update(id, AppRole) {
    return AppRoleModel.findByIdAndUpdate(id, AppRole).then(
      (AppRole) => new AppRoleEntity(AppRole.toObject())
    )
  }

  async find(query) {
    const realQuery = {}

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key]
    }

    //TODO: filter to be active
    return AppRoleModel.find(realQuery).then((AppRoles) =>
      AppRoles.filter(AppRole => AppRole).map((AppRole) => new AppRoleEntity(AppRole.toObject()))
    )
  }
}
