import ITemplatePackageRepository from './interface'
import { IId } from '../../models/interface'
import UserRepository from '../User'
import Container, { Service } from 'typedi'
import BaseRepository from '../repository'
import TemplateRepository from '../Template/repository'
import SubmissionPeriodRepository from '../SubmissionPeriod'
import TemplatePackageModel from '../../models/TemplatePackage'
import TemplatePackage from '../../entities/TemplatePackage'
import StatusRepository from '../Status'

// MongoDB implementation
@Service()
export default class TemplatePackageRepository extends BaseRepository<TemplatePackage>
  implements ITemplatePackageRepository<TemplatePackage> {
  private submissionPeriodRepository: SubmissionPeriodRepository
  private userRepository: UserRepository
  private templateRepository: TemplateRepository
  private statusRepository: StatusRepository

  constructor() {
    super(TemplatePackageModel)

    this.submissionPeriodRepository = Container.get(SubmissionPeriodRepository)
    this.userRepository = Container.get(UserRepository)
    this.templateRepository = Container.get(TemplateRepository)
    this.statusRepository = Container.get(StatusRepository)
  }

  public async create(
    {
      name,
      submissionPeriodId,
      templateIds,
      statusId,
      creationDate,
      userCreatorId
    }: TemplatePackage
  ): Promise<TemplatePackage> {
    return (
      this.submissionPeriodRepository.validate(submissionPeriodId)
        .then(() => this.templateRepository.validateMany(templateIds))
        .then(() => this.statusRepository.validate(statusId))
        .then(() => this.userRepository.validate(userCreatorId))
        .then(() => TemplatePackageModel.create(
          {
            name,
            submissionPeriodId,
            templateIds,
            statusId,
            creationDate,
            userCreatorId
          }
        ))
        .then((templatePackage) => new TemplatePackage(templatePackage.toObject()))
    )
  }

  public async update(
    id: IId,
    {
      name,
      submissionPeriodId,
      templateIds,
      statusId,
      creationDate,
      userCreatorId
    }: TemplatePackage
  ): Promise<TemplatePackage> {
    return (
      (statusId
        ? this.statusRepository.validate(statusId)
        : new Promise((resolve) => resolve())
      )
        .then(() => {
          if (userCreatorId) return this.userRepository.validate(userCreatorId)
        })
        .then(() => {
          if(templateIds) return this.templateRepository.validateMany(templateIds)
        })
        .then(() => {
          if(submissionPeriodId) return this.submissionPeriodRepository.validate(submissionPeriodId)
        })
        .then(() =>
          TemplatePackageModel.findByIdAndUpdate(id, {
            name,
            submissionPeriodId,
            templateIds,
            statusId,
            creationDate,
            userCreatorId
          })
        )
        .then((templatePackage) => new TemplatePackage(templatePackage.toObject()))
    )
  }

  public async find(query: TemplatePackage): Promise<TemplatePackage[]> {
    const realQuery = {}

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key]
    }

    return TemplatePackageModel.find(realQuery)
      .then((templatePackages) =>
        templatePackages.map((templatePackage) => new TemplatePackage(templatePackage.toObject()))
      )
  }

  public async delete(id: IId): Promise<TemplatePackage> {
    return TemplatePackageModel.findByIdAndDelete(id).then(
      (templatePackage) => new TemplatePackage(templatePackage.toObject())
    )
  }
}
