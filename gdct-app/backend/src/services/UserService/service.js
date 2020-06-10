import User from '../../entities/User'

// @Service()
export default class UserService {
  register() {
    // JS User object
    try {
      this.UserRpository.create(new User(/** User Object parameters */))
    } catch (error) {
      throw `Failed to register user\n${error}`
    }
  }

  login(username) {
    this.UserRpository.findActiveUserByUsername(username)
  }

  logout() {}

  verifyEmail() {}

  changePassword() {}
}
