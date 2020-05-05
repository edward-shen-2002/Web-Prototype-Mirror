import IChartOfAccountsHierarchy from "./interface";
import ChartOfAccountsHierarchy from "../../entities/ChartOfAccountsHierarchy";

export default class ChartOfAccountsHierarchyRepository implements IChartOfAccountsHierarchy<ChartOfAccountsHierarchy> {
  create(item: IChartOfAccountsHierarchy<ChartOfAccountsHierarchy>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: IChartOfAccountsHierarchy<ChartOfAccountsHierarchy>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: IChartOfAccountsHierarchy<ChartOfAccountsHierarchy>): Promise<IChartOfAccountsHierarchy<ChartOfAccountsHierarchy>[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<IChartOfAccountsHierarchy<ChartOfAccountsHierarchy>> {
    throw new Error("Method not implemented.");
  }
  
}