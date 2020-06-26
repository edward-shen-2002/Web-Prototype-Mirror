import OrgEntity from '../../entities/Organization'
import BaseRepository from '../repository'
import OrgModel from '../../models/Organization'

export default class OrgRepository extends BaseRepository {

  constructor() {
    super(OrgModel)
  }

  async findByOrgGroupId(orgGroupId) {
    return OrgModel.find(orgGroupId).then(
      (organizations) => new OrgEntity(organizations.toObject())
    )
  }
}
