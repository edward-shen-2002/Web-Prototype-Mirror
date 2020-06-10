import Container, { Service } from 'typedi'
import AppRoleRepository from '../../repositories/AppRole'

// @Service()
export default class AppRoleService {
  constructor() {
    this.AppRoleRepository = Container.get(AppRoleRepository)
  }

  async createAppRole(AppRole) {
    return this.AppRoleRepository.create(AppRole)
  }

  async deleteAppRole(id) {
    return this.AppRoleRepository.delete(id)
  }

  async updateAppRole(id, AppRole) {
    return this.AppRoleRepository.update(id, AppRole)
  }

  async findAppRole(AppRole) {
    return this.AppRoleRepository.find(AppRole)
  }
}
