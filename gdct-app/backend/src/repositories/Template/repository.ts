import ITemplateRepository from './interface'
import TemplateEntity from '../../entities/Template'
import TemplateModel from '../../models/Template'
import { IId } from '../../models/interface'
import StatusRepository from '../Status'
import UserRepository from '../User'
import Container, { Service } from 'typedi'
import TemplateTypeRepository from '../TemplateType'
import BaseRepository from '../repository'

// MongoDB implementation
@Service()
export default class TemplateRepository extends BaseRepository<TemplateEntity>
  implements ITemplateRepository<TemplateEntity> {
  private statusRepository: StatusRepository
  private userRepository: UserRepository
  private templateTypeRepository: TemplateTypeRepository

  constructor() {
    super(TemplateModel)

    this.statusRepository = Container.get(StatusRepository)
    this.userRepository = Container.get(UserRepository)
    this.templateTypeRepository = Container.get(TemplateTypeRepository)
  }

  public async create({
    name,
    templateData,
    templateTypeId,
    userCreatorId,
    creationDate,
    expirationDate,
    statusId
  }: TemplateEntity): Promise<TemplateEntity> {
    return (
      this.statusRepository
        .validate(statusId)
        // .then(() => this.userRepository.validate(userCreatorId))
        .then(() => this.templateTypeRepository.validate(templateTypeId))
        .then(() =>
          TemplateModel.create({
            name,
            templateData,
            templateTypeId,
            userCreatorId,
            creationDate,
            expirationDate,
            statusId
          })
        )
        .then((template) => new TemplateEntity(template.toObject()))
    )
  }

  public async update(
    id: IId,
    {
      name,
      templateData,
      templateTypeId,
      userCreatorId,
      creationDate,
      expirationDate,
      statusId
    }: TemplateEntity
  ): Promise<TemplateEntity> {
    return (
      (statusId
        ? this.statusRepository.validate(statusId)
        : new Promise((resolve) => resolve())
      )
        // .then(() => {
        //   if (userCreatorId) return this.userRepository.validate(userCreatorId)
        // })
        .then(() =>
          TemplateModel.findByIdAndUpdate(id, {
            name,
            templateData,
            templateTypeId,
            userCreatorId,
            creationDate,
            expirationDate,
            statusId
          })
        )
        .then((template) => new TemplateEntity(template.toObject()))
    )
  }

  public async find(query: TemplateEntity): Promise<TemplateEntity[]> {
    const realQuery = {}

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key]
    }

    return TemplateModel.find(realQuery)
      .select("-templateData")
      .then((templates) =>
        templates.map((template) => new TemplateEntity(template.toObject()))
      )
  }
}
