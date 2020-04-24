import IChartOfAccountsGroupRepository from './interface'
import ChartOfAccountsGroup from '../../entities/ChartOfAccountsGroup'

export default class CategoryGroupRepository
  implements IChartOfAccountsGroupRepository<ChartOfAccountsGroup> {
  create(
    item: IChartOfAccountsGroupRepository<ChartOfAccountsGroup>
  ): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  update(
    id: string,
    item: IChartOfAccountsGroupRepository<ChartOfAccountsGroup>
  ): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  find(
    item: IChartOfAccountsGroupRepository<ChartOfAccountsGroup>
  ): Promise<IChartOfAccountsGroupRepository<ChartOfAccountsGroup>[]> {
    throw new Error('Method not implemented.')
  }
  findOne(
    id: string
  ): Promise<IChartOfAccountsGroupRepository<ChartOfAccountsGroup>> {
    throw new Error('Method not implemented.')
  }
}
