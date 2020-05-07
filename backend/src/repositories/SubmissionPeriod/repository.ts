import ISubmissionPeriodRepository from './interface'
import SubmissionPeriod from '../../entities/SubmissionPeriod'
import BaseRepository from '../repository'

export default class SubmissionPeriodRepository extends BaseRepository<SubmissionPeriod>
  implements ISubmissionPeriodRepository<SubmissionPeriod> {

}
