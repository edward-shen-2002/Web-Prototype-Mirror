import IOrganizationRepository from "./interface";
import Organization from "../../entities/Organization";

export default class OrganizationRepository implements IOrganizationRepository<Organization> {
  create({
    name,
    code,
    address,
    organizationGroupId,
    managerUserId,
    contactUserId,
    authorizedUserId,
    location,
    programIds
  }): Promise<Boolean> {
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

}
