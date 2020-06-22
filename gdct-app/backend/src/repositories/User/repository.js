import BaseRepository from '../repository'
import UserModel from "../../models/User";
import UserEntity from "../../entities/User";


export default class UserRepository extends BaseRepository {
  constructor() {
    super(UserModel)
  }

  async create(User) {
    return UserModel.create(User).then((user) =>
      new UserEntity(user.toObject())
    );
  }

  async findById(_id) {
    return UserModel.findOne({_id})
      .then((user) => {
        if(!result) throw new Error('_id does not exist')
        return new UserEntity(user.toObject())
      })
  }

  async updateSysRole(_id, sysRole) {
    return UserModel.findOneAndUpdate({_id}, {sysRole: sysRole})
  }

  async activeUser(_id) {
    return UserModel.findOneAndUpdate({_id}, {isActive: true})
  }

  async update(_id, user) {
    return UserModel.findOneAndUpdate({_id},{user})
  }
}
