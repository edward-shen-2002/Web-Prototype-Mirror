import IAppRoleRepository from './interface'
import AppRoleEntity from '../../entities/AppRole'
import BaseRepository from '../repository'
import AppRoleModel from '../../models/AppRole'
import { IId } from '../../models/interface'

export default class ReportPeriodRepository extends BaseRepository<AppRoleEntity>
  implements IAppRoleRepository<AppRoleEntity> {
  public async delete(id: IId): Promise<AppRoleEntity> {
    return AppRoleModel.findByIdAndDelete(id).then(
      (AppRole) => new AppRoleEntity(AppRole.toObject())
    )
  }

  public async create(AppRole: AppRoleEntity): Promise<AppRoleEntity> {
    return AppRoleModel.create(AppRole).then((AppRole) => new AppRoleEntity(AppRole.toObject()))
  }

  public async update(id: IId, AppRole: AppRoleEntity): Promise<AppRoleEntity> {
    return AppRoleModel.findByIdAndUpdate(id, AppRole).then(
      (AppRole) => new AppRoleEntity(AppRole.toObject())
    )
  }

  public async find(query: AppRoleEntity): Promise<AppRoleEntity[]> {
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
