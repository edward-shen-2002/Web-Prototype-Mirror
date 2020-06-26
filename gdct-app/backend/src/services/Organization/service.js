import Container, { Service } from "typedi";
import OrgRepository from "../../repositories/Organization";

// @Service()
export default class OrgService {
  constructor() {
    this.OrgRepository = Container.get(OrgRepository);
  }


  async findOrgByOrgGroupId(OrgGroupId) {
    return this.OrgRepository.findByOrgGroupId(OrgGroupId);
  }
}