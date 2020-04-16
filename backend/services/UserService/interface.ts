import User from "../../entities/User"

export default interface IUserService {
  login           : () => void
  register        : (user: object) => void 
  logout          : () => void

  verifyEmail     : (code: string) => void

  // Account management
  changePassword  : (password: string) => void
}
