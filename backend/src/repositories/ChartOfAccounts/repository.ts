import IChartOfAccountsRepository from './interface'
import ChartOfAccounts from '../../entities/ChartOfAccounts'

export default class ChartOfAccounts
  implements IChartOfAccountsRepository<ChartOfAccounts> {
  create(item: IChartOfAccountsRepository<ChartOfAccounts>): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  update(
    id: string,
    item: IChartOfAccountsRepository<ChartOfAccounts>
  ): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  find(
    item: IChartOfAccountsRepository<ChartOfAccounts>
  ): Promise<IChartOfAccountsRepository<ChartOfAccounts>[]> {
    throw new Error('Method not implemented.')
  }
  findOne(id: string): Promise<IChartOfAccountsRepository<ChartOfAccounts>> {
    throw new Error('Method not implemented.')
  }
}
