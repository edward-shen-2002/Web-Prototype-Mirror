import BaseRepository from '../repository'
import ProgramModel from '../../models/Program'
import ProgramEntity from "../../entities/Program";

export default class ProgramRepository extends BaseRepository {
  constructor() {
    super(ProgramModel)
  }
  async findByIds(ids) {
    return ProgramModel.find({_id: {$in: ids}}, {isActive: true})
      .then((programs) => new ProgramEntity(programs.toObject()))
  }

}
