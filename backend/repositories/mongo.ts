import { IRepository } from "./interface";

export default abstract class MongoBaseRepository<T> implements IRepository<T> {
  create(item: T): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: T): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: T): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
}
