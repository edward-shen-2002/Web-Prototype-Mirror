import IOrganizationGroupRepository from './interface'
import OrganizationGroupEntity from '../../entities/OrganizationGroup'
import BaseRepository from '../repository'

export default class OrganizationGroupRepository extends BaseRepository<OrganizationGroupEntity>
  implements IOrganizationGroupRepository<OrganizationGroupEntity> {
  create(
    item: IOrganizationGroupRepository<OrganizationGroupEntity>
  ): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  update(
    id: string,
    item: IOrganizationGroupRepository<OrganizationGroupEntity>
  ): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  find(
    item: IOrganizationGroupRepository<OrganizationGroupEntity>
  ): Promise<IOrganizationGroupRepository<OrganizationGroupEntity>[]> {
    throw new Error('Method not implemented.')
  }
  findOne(
    id: string
  ): Promise<IOrganizationGroupRepository<OrganizationGroupEntity>> {
    throw new Error('Method not implemented.')
  }
}
