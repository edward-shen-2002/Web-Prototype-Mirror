import IProgramRepository from "./interface";
import Program from "../../entities/Program";
import BaseRepository from "../repository";
import ProgramModel from "../../models/Program";

export default class ProgramRepository extends BaseRepository<Program> implements IProgramRepository<Program> {
  constructor() {
    super(ProgramModel)
  }
}