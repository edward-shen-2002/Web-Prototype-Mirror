import SubmissionPeriodEntity from '../../entities/SubmissionPeriod';
import BaseRepository from '../repository';
import SubmissionPeriodModel from '../../models/SubmissionPeriod';

export default class SubmissionPeriodRepository extends BaseRepository {
  constructor() {
    super(SubmissionPeriodModel);
  }

  async delete(id) {
    return SubmissionPeriodModel.findByIdAndDelete(id).then(
      submissionPeriod => new SubmissionPeriodEntity(submissionPeriod.toObject()),
    );
  }

  async create(submissionPeriod) {
    return SubmissionPeriodModel.create(submissionPeriod).then(
      submissionPeriod => new SubmissionPeriodEntity(submissionPeriod.toObject()),
    );
  }

  async update(id, submissionPeriod) {
    return SubmissionPeriodModel.findByIdAndUpdate(id, submissionPeriod).then(
      submissionPeriod => new SubmissionPeriodEntity(submissionPeriod.toObject()),
    );
  }

  async find(query) {
    const realQuery = {};

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key];
    }

    return SubmissionPeriodModel.find(realQuery).then(submissionPeriods =>
      submissionPeriods.map(
        submissionPeriod => new SubmissionPeriodEntity(submissionPeriod.toObject()),
      ),
    );
  }
}
