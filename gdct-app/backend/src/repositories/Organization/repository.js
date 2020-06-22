import OrganizationEntity from '../../entities/Organization'
import BaseRepository from '../repository'
import OrganizationModel from '../../models/Organization'

export default class OrganizationRepository extends BaseRepository {

  constructor() {
    super(OrganizationModel)
  }

  async findByOrgGroupId(orgGroupId) {
    return OrganizationModel.find(orgGroupId).then(
      (organizations) => new OrganizationEntity(organizations.toObject())
    )
  }
}
