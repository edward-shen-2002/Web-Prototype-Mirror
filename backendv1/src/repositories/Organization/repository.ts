import IOrganizationRepository from "./interface";
import Organization from "../../entities/Organization";
import OrganizationModel from "../../models/Organization";

export default class OrganizationRepository implements IOrganizationRepository<Organization> {
  create(item: IOrganizationRepository<Organization>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: IOrganizationRepository<Organization>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: IOrganizationRepository<Organization>): Promise<IOrganizationRepository<Organization>[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<IOrganizationRepository<Organization>> {
    throw new Error("Method not implemented.");
  }
  async findByOrgGroup(organizationGroupId) {
    OrganizationModel.find({organizationGroupId: organizationGroupId})
      .then((organization) => {
        return organization;
      })
  }

}
