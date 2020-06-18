import ProgramEntity from '../../entities/Program'
import BaseRepository from '../repository'
import ProgramModel from '../../models/Program'
import OrganizationModel from '../../models/Organization'
import TemplateTypeModel from '../../models/TemplateType'

export default class ProgramRepository extends BaseRepository {
  constructor() {
    super(ProgramModel)
  }

  async delete(id) {
    var mongoose = require('mongoose')
    var temp = mongoose.Types.ObjectId(id)
    OrganizationModel.find({ 'programId': temp }, function (err, program1) {
      TemplateTypeModel.find({ 'programId': temp }, function (err, program2) {
        if (program1.length > 0 || program2.length > 0) {
          return ProgramModel;
        } else {
          return ProgramModel.findByIdAndDelete(id).then(() => { });
        }
      })
    })
  }

  async create(program) {
    return ProgramModel.create(program);
  }

  async update(id, program) {
    return ProgramModel.findByIdAndUpdate(id, program);
  }

  async find(query) {
    const realQuery = {}

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key]
    }
    return ProgramModel.find(realQuery);
  }
}
