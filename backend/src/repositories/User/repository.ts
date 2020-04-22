import IUserRepository from "./interface";
import User from "../../entities/User";
import { Service } from "typedi";

@Service()
export default class UserRepository implements IUserRepository<User> {
  findActiveUserByUsername: (username: string) => User;
  create(item: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(id: import("../../models/interface").IId, item: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: import("../../models/interface").IId): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(item: User): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: import("../../models/interface").IId): Promise<User> {
    throw new Error("Method not implemented.");
  }
  validate(id: import("../../models/interface").IId): Promise<void> {
    throw new Error("Method not implemented.");
  }

}