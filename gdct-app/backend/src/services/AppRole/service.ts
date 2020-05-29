import IAppRoleServie from './interface'
import AppRole from '../../entities/AppRole'
import { IId } from '../../models/interface'
import Container, { Service } from 'typedi'
import AppRoleRepository from '../../repositories/AppRole'

@Service()
export default class AppRoleService implements IAppRoleServie {
  private AppRoleRepository: AppRoleRepository

  constructor() {
    this.AppRoleRepository = Container.get(AppRoleRepository)
  }

  public async createAppRole(AppRole: AppRole) {
    return this.AppRoleRepository.create(AppRole)
  }

  public async deleteAppRole(id: IId) {
    return this.AppRoleRepository.delete(id)
  }

  public async updateAppRole(id: IId, AppRole: AppRole) {
    return this.AppRoleRepository.update(id, AppRole)
  }

  public async findAppRole(AppRole: AppRole) {
    return this.AppRoleRepository.find(AppRole)
  }
}
