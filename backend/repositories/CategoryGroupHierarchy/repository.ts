import ICategoryGroupRepository from "./interface";
import IMongoRepository from '../mongo';
import CategoryGroup from "../../entities/CategoryGroup";

export default class CategoryGroupRepository implements IMongoRepository<ICategoryGroupRepository<CategoryGroup>> {
  create(item: ICategoryGroupRepository<CategoryGroup>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: ICategoryGroupRepository<CategoryGroup>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: ICategoryGroupRepository<CategoryGroup>): Promise<ICategoryGroupRepository<CategoryGroup>[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<ICategoryGroupRepository<CategoryGroup>> {
    throw new Error("Method not implemented.");
  }
  
}