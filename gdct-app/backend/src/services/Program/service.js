import Container, { Service } from "typedi";
import ProgramRepository from "../../repositories/Program";

// @Service()
export default class ProgramService {
  constructor() {
    this.ProgramRepository = Container.get(ProgramRepository);
  }


  async findProgramByIds(ids) {
    return this.ProgramRepository.findByIds(ids);
  }
}