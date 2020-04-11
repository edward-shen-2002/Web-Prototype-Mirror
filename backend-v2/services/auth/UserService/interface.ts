import { DocumentQuery, Schema } from "mongoose";
import IUserDocument from "../../../models/User/interface";

type GetUserByUsername = (username: string) => DocumentQuery<IUserDocument, IUserDocument>
type GetUserByUserID = (userID: string | Schema.Types.ObjectId) => DocumentQuery<IUserDocument, IUserDocument>

export default interface IUserService {
  getUserByUsername : GetUserByUsername
  getUserByUserID   : GetUserByUserID
}
