import Container from 'typedi';
import AppSysRoleRepository from '../../repositories/AppSysRole';

// @Service()
export default class AppSysRoleService {
  constructor() {
    this.AppSysRoleRepository = Container.get(AppSysRoleRepository);
  }

  async createAppSysRole(AppSysRole) {
    return this.AppSysRoleRepository.create(AppSysRole);
  }

  async deleteAppSysRole(id) {
    return this.AppSysRoleRepository.delete(id);
  }

  async updateAppSysRole(id, AppSysRole) {
    return this.AppSysRoleRepository.update(id, AppSysRole);
  }

  async findAppSysRole(AppSysRole) {
    return this.AppSysRoleRepository.find(AppSysRole);
  }

  async findById(id) {
    return this.AppSysRoleRepository.findById(id);
  }
}
