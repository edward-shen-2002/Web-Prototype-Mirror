import { Service } from 'typedi'
import IUserService from './interface'
import IUserRepository from '../../repositories/User/interface'
import User from '../../entities/User'

@Service()
export default class UserService implements IUserService {
  constructor(private UserRpository: IUserRepository<User>) {}

  public register() {
    // JS User object
    try {
      this.UserRpository.create(new User(/** User Object parameters */))
    } catch (error) {
      throw `Failed to register user\n${error}`
    }
  }

  public login(username) {
    this.UserRpository.findActiveUserByUsername(username)
  }

  public logout() {}

  public verifyEmail() {}

  public changePassword() {}
}
