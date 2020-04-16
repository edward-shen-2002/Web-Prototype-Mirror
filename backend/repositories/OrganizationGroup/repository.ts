import IOrganizationGroupRepository from "./interface";
import OrganizationGroup from "../../entities/OrganizationGroup";

export default class OrganizationGroupRepository implements IOrganizationGroupRepository<OrganizationGroup> {
  create(item: IOrganizationGroupRepository<OrganizationGroup>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: IOrganizationGroupRepository<OrganizationGroup>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: IOrganizationGroupRepository<OrganizationGroup>): Promise<IOrganizationGroupRepository<OrganizationGroup>[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<IOrganizationGroupRepository<OrganizationGroup>> {
    throw new Error("Method not implemented.");
  }
  
}