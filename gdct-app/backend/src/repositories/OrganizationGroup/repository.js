import BaseRepository from '../repository'
import OrganizationGroupModel from '../../models/OrganizationGroup'
import OrganizationGroupEntity from "../../entities/OrganizationGroup";

export default class OrganizationGroupRepository extends BaseRepository {

  constructor() {
    super(OrganizationGroupModel)
  }

  async findAll() {
    return OrganizationGroupModel.find().then(
      (organizationGroups) => new OrganizationGroupEntity(organizationGroups.toObject())
    )
  }
}
