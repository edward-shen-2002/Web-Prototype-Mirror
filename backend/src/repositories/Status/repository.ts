import IStatusRepository from "./interface";
import Status from "../../entities/Status";

export default class StatusRepository implements IStatusRepository<Status> {
  create(item: Status): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: import("../../models/interface").IId, item: Status): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: import("../../models/interface").IId): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: Status): Promise<Status[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: import("../../models/interface").IId): Promise<Status> {
    throw new Error("Method not implemented.");
  }
}