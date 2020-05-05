import User from "../../entities/User";
import UserSYSRoleModel from '../../models/UserSYSRole'

export default class UserSYSRoleRepository {

  async create(userSYSInfo) {
    UserSYSRoleModel.create(userSYSInfo)
      .then((userSYSInfo) => {
        return userSYSInfo;
      })
  }
  // update(id: string, item: IUserRepository<User>): Promise<Boolean> {
  //
  //   throw new Error("Method not implemented.");
  // }
  // delete(id: string): Promise<Boolean> {
  //   throw new Error("Method not implemented.");
  // }
  // find(item: IUserRepository<User>): Promise<IUserRepository<User>[]> {
  //   throw new Error("Method not implemented.");
  // }
  // findOne(id: string): Promise<IUserRepository<User>> {
  //   throw new Error("Method not implemented.");
  // }
}
