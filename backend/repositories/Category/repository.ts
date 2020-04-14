import ICategoryRepository from "./interface";
import IMongoRepository from '../mongo';
import Category from "../../entities/Category";

export default class CategoryRepository implements IMongoRepository<ICategoryRepository<Category>> {
  create(item: ICategoryRepository<Category>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: ICategoryRepository<Category>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: ICategoryRepository<Category>): Promise<ICategoryRepository<Category>[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<ICategoryRepository<Category>> {
    throw new Error("Method not implemented.");
  }
}