import IAppSysRoleServie from './interface'
import AppSysRole from '../../entities/AppSysRole'
import { IId } from '../../models/interface'
import Container, { Service } from 'typedi'
import AppSysRoleRepository from '../../repositories/AppSysRole'

@Service()
export default class AppSysRoleService implements IAppSysRoleServie {
  private AppSysRoleRepository: AppSysRoleRepository

  constructor() {
    this.AppSysRoleRepository = Container.get(AppSysRoleRepository)
  }

  public async createAppSysRole(AppSysRole: AppSysRole) {
    return this.AppSysRoleRepository.create(AppSysRole)
  }

  public async deleteAppSysRole(id: IId) {
    return this.AppSysRoleRepository.delete(id)
  }

  public async updateAppSysRole(id: IId, AppSysRole: AppSysRole) {
    return this.AppSysRoleRepository.update(id, AppSysRole)
  }

  public async findAppSysRole(AppSysRole: AppSysRole) {
    return this.AppSysRoleRepository.find(AppSysRole)
  }
}
