import IUserRepository from './interface'
import User from '../../entities/User'
import { Service } from 'typedi'
import BaseRepository from '../repository'
import UserModel from '../../models/User'

@Service()
export default class UserRepository extends BaseRepository<User> implements IUserRepository<User> {
  constructor() {
    super(UserModel)
  }

  findActiveUserByUsername: (username: string) => User
}
