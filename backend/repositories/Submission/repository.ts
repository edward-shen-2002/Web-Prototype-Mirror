import ISubmissionRepository from "./interface";
import IMongoRepository from '../mongo';
import Submission from "../../entities/Submission";

export default class SubmissionRepository implements IMongoRepository<ISubmissionRepository<Submission>> {
  create(item: ISubmissionRepository<Submission>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: ISubmissionRepository<Submission>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: ISubmissionRepository<Submission>): Promise<ISubmissionRepository<Submission>[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<ISubmissionRepository<Submission>> {
    throw new Error("Method not implemented.");
  }
  
}