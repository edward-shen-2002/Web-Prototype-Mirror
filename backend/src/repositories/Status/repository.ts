import IStatusRepository from "./interface";
import Status from "../../entities/Status";
import BaseRepository from "../repository";
import { Service } from "typedi";
import StatusModel from "../../models/Status";

@Service()
export default class StatusRepository extends BaseRepository<Status> implements IStatusRepository<Status> {
  constructor() {
    super(StatusModel)
  }
  create(item: Status): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(id: import("../../models/interface").IId, item: Status): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: import("../../models/interface").IId): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(item: Status): Promise<Status[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: import("../../models/interface").IId): Promise<Status> {
    throw new Error("Method not implemented.");
  }
}