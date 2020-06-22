import Container, { Service } from "typedi";
import OrganizationRepository from "../../repositories/Organization";

// @Service()
export default class OrganizationService {
  constructor() {
    this.OrganizationRepository = Container.get(OrganizationRepository);
  }


  async findOrgByOrgGroupId(OrgGroupId) {
    return this.OrganizationRepository.findByOrgGroupId(OrgGroupId);
  }
}