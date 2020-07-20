import SubmissionEntity from '../../entities/Submission/Submission';
import BaseRepository from '../repository';
import SubmissionModel from '../../models/Submission';

export default class SubmissionRepository extends BaseRepository {
  constructor() {
    super(SubmissionModel);
  }

  async delete(id) {
    return SubmissionModel.findByIdAndDelete(id).then(
      submission => new SubmissionEntity(submission.toObject()),
    );
  }

  async create(submission) {
    return SubmissionModel.create(submission).then(
      submission => new SubmissionEntity(submission.toObject()),
    );
  }

  async update(id, submission) {
    return SubmissionModel.findByIdAndUpdate(id, submission).then(
      submission => new SubmissionEntity(submission.toObject()),
    );
  }

  async find(query) {
    const realQuery = {};

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key];
    }

    return SubmissionModel.find(realQuery)
      .select('-workbookData')
      .then(submissions =>
        submissions.map(submission => new SubmissionEntity(submission.toObject())),
      );
  }
}
