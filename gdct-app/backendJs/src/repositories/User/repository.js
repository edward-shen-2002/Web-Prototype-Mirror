import { Service } from 'typedi'
import BaseRepository from '../repository'
import UserModel from '../../models/User'

// @Service()
export default class UserRepository extends BaseRepository {
  constructor() {
    super(UserModel)
  }
}
