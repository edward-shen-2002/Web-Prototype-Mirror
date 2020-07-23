import Container from 'typedi';
import AppResourceRepository from '../../repositories/AppResource';

// @Service()
export default class AppResourceService {
  constructor() {
    this.appResourceRepository = Container.get(AppResourceRepository);
  }

  async createAppResource(appResource) {
    return this.appResourceRepository.create(appResource);
  }

  async deleteAppResource(id) {
    return this.appResourceRepository.delete(id);
  }

  async updateAppResource(id, appResource) {
    return this.appResourceRepository.update(id, appResource);
  }

  async findAppResource(appResource) {
    return this.appResourceRepository.find(appResource);
  }

  async findById(id) {
    return this.appResourceRepository.findById(id);
  }
}
