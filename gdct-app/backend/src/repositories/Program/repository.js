import BaseRepository from '../repository'
import ProgramModel from '../../models/Program'

export default class ProgramRepository extends BaseRepository {
  constructor() {
    super(ProgramModel)
  }
}
