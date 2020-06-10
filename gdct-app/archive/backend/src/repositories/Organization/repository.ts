import IOrganizationRepository from './interface'
import OrganizationEntity from '../../entities/Organization'
import BaseRepository from '../repository'

export default class OrganizationRepository extends BaseRepository<OrganizationEntity>
  implements IOrganizationRepository<OrganizationEntity> {
}
