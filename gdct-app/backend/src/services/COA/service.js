import Container from 'typedi';
import COARepository from '../../repositories/COA';

// @Service()
export default class COAService {
  constructor() {
    this.COARepository = Container.get(COARepository);
  }

  async createCOA(COA) {
    return this.COARepository.create(COA);
  }

  async deleteCOA(id) {
    return this.COARepository.delete(id);
  }

  async updateCOA(id, COA) {
    return this.COARepository.update(id, COA);
  }

  async findCOA(COA) {
    return this.COARepository.find(COA);
  }
}
