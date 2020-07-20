import BaseRepository from '../repository'
import OrgGroupModel from '../../models/OrganizationGroup'
import OrgGroupEntity from "../../entities/OrganizationGroup";

export default class OrgGroupRepository extends BaseRepository {

  constructor() {
    super(OrgGroupModel)
  }

  async findAll() {
    return OrgGroupModel.find().then(
      (organizationGroups) => new OrgGroupEntity(organizationGroups.toObject())
    )
  }
}
