import Container from 'typedi';
import UserRepository from '../User';
import BaseRepository from '../repository';
import TemplateRepository from '../Template/repository';
import SubmissionPeriodRepository from '../SubmissionPeriod';
import TemplatePackageModel from '../../models/TemplatePackage';
import TemplatePackageEntity from '../../entities/TemplatePackage';
import StatusRepository from '../Status';
import UsersRepository from '../Users';

// MongoDB implementation
// @Service()
export default class TemplatePackageRepository extends BaseRepository {
  constructor() {
    super(TemplatePackageModel);

    this.submissionPeriodRepository = Container.get(SubmissionPeriodRepository);
    this.usersRepository = Container.get(UsersRepository)
    this.userRepository = Container.get(UserRepository);
    this.templateRepository = Container.get(TemplateRepository);
    this.statusRepository = Container.get(StatusRepository);
  }

  async create({ name, submissionPeriodId, templateIds, statusId, creationDate, userCreatorId }) {
    return (
      this.submissionPeriodRepository
        .validate(submissionPeriodId)
        .then(() => this.templateRepository.validateMany(templateIds))
        .then(() => this.statusRepository.validate(statusId))
        // .then(() => this.userRepository.validate(userCreatorId))
        .then(() =>
          TemplatePackageModel.create({
            name,
            submissionPeriodId,
            templateIds,
            statusId,
            creationDate,
            userCreatorId,
          }),
        )
        .then(templatePackage => new TemplatePackageEntity(templatePackage.toObject()))
    );
  }

  async update(
    id,
    { name, submissionPeriodId, templateIds, statusId, creationDate, userCreatorId },
  ) {
    return (
      (statusId ? this.statusRepository.validate(statusId) : new Promise(resolve => resolve()))
        // .then(() => {
        //   if (userCreatorId) return this.userRepository.validate(userCreatorId)
        // })
        .then(() => {
          if (templateIds) return this.templateRepository.validateMany(templateIds);
        })
        .then(() => {
          if (submissionPeriodId)
            return this.submissionPeriodRepository.validate(submissionPeriodId);
        })
        .then(() =>
          TemplatePackageModel.findByIdAndUpdate(id, {
            name,
            submissionPeriodId,
            templateIds,
            statusId,
            creationDate,
            userCreatorId,
          }),
        )
        .then(templatePackage => new TemplatePackageEntity(templatePackage.toObject()))
    );
  }

  async find(query) {
    const realQuery = {};

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key];
    }

    return TemplatePackageModel.find(realQuery).then(templatePackages =>
      templatePackages.map(
        templatePackage => new TemplatePackageEntity(templatePackage.toObject()),
      ),
    );
  }

  async delete(id) {
    return TemplatePackageModel.findByIdAndDelete(id).then(
      templatePackage => new TemplatePackageEntity(templatePackage.toObject()),
    );
  }
}
