import Status from "../../entities/Status";
import { IId } from "../../models/interface";

export default interface IStatusService {
  createStatus  : (status: Status) => void
  deleteStatus  : (id: IId) => void
  updateStatus  : (id: IId, status: Status) => void
  findStatus    : (status: Status) => Promise<Status[]>
}