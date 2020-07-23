import Container from 'typedi';
import OrgGroupRepository from '../../repositories/OrganizationGroup';

// @Service()
export default class OrganizationGroupService {
  constructor() {
    this.OrgGroupRepository = Container.get(OrgGroupRepository);
  }

  async findAllOrgGroup() {
    return this.OrgGroupRepository.findAll();
  }
}
