import IUserRepository from "./interface";
import User from "../../entities/User";

export default class UserRepository implements IUserRepository<User> {
  findActiveUserByUsername: (username: string) => User;
  create(item: IUserRepository<User>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: IUserRepository<User>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: IUserRepository<User>): Promise<IUserRepository<User>[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<IUserRepository<User>> {
    throw new Error("Method not implemented.");
  }
}