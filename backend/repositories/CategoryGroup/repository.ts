import ICategoryGroupRepository from "./interface";
import IMongoRepository from '../mongo';
import Category from "../../entities/Category";

export default class CategoryGroupRepository implements ICategoryGroupRepository<Category> {
  create(item: ICategoryGroupRepository<Category>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: ICategoryGroupRepository<Category>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: ICategoryGroupRepository<Category>): Promise<ICategoryGroupRepository<Category>[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<ICategoryGroupRepository<Category>> {
    throw new Error("Method not implemented.");
  }
  
}