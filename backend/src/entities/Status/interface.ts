import { IStatus } from "../../models/Status/interface";
import { IId } from "../../models/interface";

export default interface IStatusEntity extends IStatus {
  _id?: IId
}