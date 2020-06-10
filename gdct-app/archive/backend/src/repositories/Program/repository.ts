import IProgramRepository from './interface'
import ProgramEntity from '../../entities/Program'
import BaseRepository from '../repository'
import ProgramModel from '../../models/Program'

export default class ProgramRepository extends BaseRepository<ProgramEntity>
  implements IProgramRepository<ProgramEntity> {
  constructor() {
    super(ProgramModel)
  }
}
