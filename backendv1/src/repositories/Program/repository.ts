import IProgramRepository from "./interface";
import Program from "../../entities/Program";
import ProgramModel from "../../models/Program";

export default class ProgramRepository implements IProgramRepository<Program> {
  create(item: IProgramRepository<Program>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: IProgramRepository<Program>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: IProgramRepository<Program>): Promise<IProgramRepository<Program>[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<IProgramRepository<Program>> {
    throw new Error("Method not implemented.");
  }
  async findByOrgId(orgId) {
    ProgramModel.find({organizationId: orgId})
      .then((program) => {
        return program;
      })
  }

}
