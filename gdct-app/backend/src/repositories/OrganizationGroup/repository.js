import IOrganizationGroupRepository from './interface'
import OrganizationGroupEntity from '../../entities/OrganizationGroup'
import BaseRepository from '../repository'

export default class OrganizationGroupRepository extends BaseRepository {
  create(
    item
  ) {
    throw new Error('Method not implemented.')
  }
  update(
    id,
    item
  ) {
    throw new Error('Method not implemented.')
  }
  delete(id) {
    throw new Error('Method not implemented.')
  }
  find(
    item
  ) {
    throw new Error('Method not implemented.')
  }
  findOne(
    id
  ) {
    throw new Error('Method not implemented.')
  }
}
