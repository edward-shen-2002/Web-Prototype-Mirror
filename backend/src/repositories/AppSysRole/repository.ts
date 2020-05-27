import IAppSysRoleRepository from './interface'
import AppSysRoleEntity from '../../entities/AppSysRole'
import BaseRepository from '../repository'
import AppSysRoleModel from '../../models/AppSysRole'
import { IId } from '../../models/interface'

export default class ReportPeriodRepository extends BaseRepository<AppSysRoleEntity>
  implements IAppSysRoleRepository<AppSysRoleEntity> {
  public async delete(id: IId): Promise<AppSysRoleEntity> {
    return AppSysRoleModel.findByIdAndDelete(id).then(
      (AppSysRole) => new AppSysRoleEntity(AppSysRole.toObject())
    )
  }

  public async create(AppSysRole: AppSysRoleEntity): Promise<AppSysRoleEntity> {
    return AppSysRoleModel.create(AppSysRole).then((AppSysRole) => new AppSysRoleEntity(AppSysRole.toObject()))
  }

  public async update(id: IId, AppSysRole: AppSysRoleEntity): Promise<AppSysRoleEntity> {
    return AppSysRoleModel.findByIdAndUpdate(id, AppSysRole).then(
      (AppSysRole) => new AppSysRoleEntity(AppSysRole.toObject())
    )
  }

  public async find(query: AppSysRoleEntity): Promise<AppSysRoleEntity[]> {
    const realQuery = {}

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key]
    }

    //TODO: filter to be active
    return AppSysRoleModel.find(realQuery).then((AppSysRoles) =>
      AppSysRoles.filter(AppSysRole => AppSysRole).map((AppSysRole) => new AppSysRoleEntity(AppSysRole.toObject()))
    )
  }
}
