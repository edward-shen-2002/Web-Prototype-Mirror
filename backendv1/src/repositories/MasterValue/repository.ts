import IMasterValueRepository from "./interface";
import MasterValue from "../../entities/MasterValue";

export default class MasterValueRepository implements IMasterValueRepository<MasterValue> {
  create(item: IMasterValueRepository<MasterValue>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: IMasterValueRepository<MasterValue>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: IMasterValueRepository<MasterValue>): Promise<IMasterValueRepository<MasterValue>[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<IMasterValueRepository<MasterValue>> {
    throw new Error("Method not implemented.");
  }
  
}