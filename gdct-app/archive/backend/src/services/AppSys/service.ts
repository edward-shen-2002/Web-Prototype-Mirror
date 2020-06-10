import IAppSysServie from './interface'
import AppSys from '../../entities/AppSys'
import { IId } from '../../models/interface'
import Container, { Service } from 'typedi'
import AppSysRepository from '../../repositories/AppSys'

@Service()
export default class AppSysService implements IAppSysServie {
  private AppSysRepository: AppSysRepository

  constructor() {
    this.AppSysRepository = Container.get(AppSysRepository)
  }

  public async createAppSys(AppSys: AppSys) {
    return this.AppSysRepository.create(AppSys)
  }

  public async deleteAppSys(id: IId) {
    return this.AppSysRepository.delete(id)
  }

  public async updateAppSys(id: IId, AppSys: AppSys) {
    return this.AppSysRepository.update(id, AppSys)
  }

  public async findAppSys(AppSys: AppSys) {
    return this.AppSysRepository.find(AppSys)
  }
}
