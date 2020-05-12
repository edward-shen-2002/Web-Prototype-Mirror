import IUserRepository from './interface'
import UserEntity from '../../entities/User'
import { Service } from 'typedi'
import BaseRepository from '../repository'
import UserModel from '../../models/User'

@Service()
export default class UserRepository extends BaseRepository<UserEntity>
  implements IUserRepository<UserEntity> {
  constructor() {
    super(UserModel)
  }

  findActiveUserByUsername: (username: string) => UserEntity
}
