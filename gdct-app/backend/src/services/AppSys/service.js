import Container, { Service } from 'typedi'
import AppSysRepository from '../../repositories/AppSys'

// @Service()
export default class AppSysService  {
  constructor() {
    this.AppSysRepository = Container.get(AppSysRepository)
  }

  async createAppSys(AppSys) {
    return this.AppSysRepository.create(AppSys)
  }

  async deleteAppSys(id) {
    return this.AppSysRepository.delete(id)
  }

  async updateAppSys(id, AppSys) {
    return this.AppSysRepository.update(id, AppSys)
  }

  async findAppSys(AppSys) {
    return this.AppSysRepository.find(AppSys)
  }
}
