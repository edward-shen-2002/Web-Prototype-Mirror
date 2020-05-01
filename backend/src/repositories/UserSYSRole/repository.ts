import IUserRepository from "./interface";
import User from "../../entities/User";
import UserModel from '../../models/User'

export default class UserRepository {
  findActiveUserByUsername: (username: string) => User;

  async create(userInfo) {
    UserModel.create(userInfo)
      .then((userInfo) => {
        return userInfo;
      })
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
