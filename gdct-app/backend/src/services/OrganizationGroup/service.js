import Container, { Service } from "typedi";
import OrganizationGroupRepository from "../../repositories/OrganizationGroup";

// @Service()
export default class OrganizationGroupService {
  constructor() {
    this.OrganizationGroupRepository = Container.get(OrganizationGroupRepository);
  }


  async findAllOrgGroup() {
    return this.OrganizationGroupRepository.findAll();
  }
}