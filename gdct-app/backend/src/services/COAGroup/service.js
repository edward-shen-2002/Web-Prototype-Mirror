import Container from 'typedi';
import COAGroupRepository from '../../repositories/COAGroup';

// @Service()
export default class COAGroupService {
  constructor() {
    this.COAGroupRepository = Container.get(COAGroupRepository);
  }

  async createCOAGroup(COAGroup) {
    return this.COAGroupRepository.create(COAGroup);
  }

  async deleteCOAGroup(id) {
    return this.COAGroupRepository.delete(id);
  }

  async updateCOAGroup(id, COAGroup) {
    return this.COAGroupRepository.update(id, COAGroup);
  }

  async findCOAGroup(COAGroup) {
    return this.COAGroupRepository.find(COAGroup);
  }
}
