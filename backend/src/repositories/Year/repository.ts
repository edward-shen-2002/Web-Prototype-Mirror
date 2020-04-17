import IYearRepository from "./interface";
import Year from "../../entities/Year";

export default class YearRepository implements IYearRepository<Year> {
  create(item: IYearRepository<Year>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: IYearRepository<Year>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: IYearRepository<Year>): Promise<IYearRepository<Year>[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<IYearRepository<Year>> {
    throw new Error("Method not implemented.");
  }
  
}