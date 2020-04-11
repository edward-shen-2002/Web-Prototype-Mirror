import { Service } from 'typedi';
import { Model } from 'mongoose';
import IUserDocument from '../../../models/User/interface';
import IUserService from './interface';

@Service()
export default class UserService implements IUserService {
  constructor(
    private UserModel: Model<IUserDocument>
  ){}

  public getUserBIOptionsyUsername(username) {
    return this.UserModel.findOne({ username })
  }

  public getUserByUserID(userID) {
    return this.UserModel.findById(userID)
  }
}
