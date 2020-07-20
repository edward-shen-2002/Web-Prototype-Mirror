import Container from 'typedi';
import AppRoleResourceRepository from '../../repositories/AppRoleResource';

// @Service()
export default class AppRoleResourceService {
  constructor() {
    this.AppRoleResourceRepository = Container.get(AppRoleResourceRepository);
  }

  async createAppRoleResource(appRoleResource) {
    return this.AppRoleResourceRepository.create(appRoleResource);
  }

  async deleteAppRoleResource(id) {
    return this.AppRoleResourceRepository.delete(id);
  }

  async updateAppRoleResource(id, appRoleResource) {
    return this.AppRoleResourceRepository.update(id, appRoleResource);
  }

  async findAppRoleResource(appRoleResource) {
    return this.AppRoleResourceRepository.find(appRoleResource);
  }

  async findById(id) {
    return this.AppRoleResourceRepository.findById(id);
  }
}
