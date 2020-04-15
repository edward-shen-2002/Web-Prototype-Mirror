import User from "../../entities/User"

type GetUserByUsername = (username: string) => User
type GetUserByUserID = (userID: string) => User

export default interface IUserService {
  getUserByUsername : GetUserByUsername
  getUserByUserID   : GetUserByUserID
}
