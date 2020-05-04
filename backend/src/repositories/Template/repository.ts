import ITemplateRepository from './interface'
import Template from '../../entities/Template'
import TemplateModel from '../../models/Template'
import { IId } from '../../models/interface'
import StatusRepository from '../Status'
import UserRepository from '../User'
import Container, { Service } from 'typedi'
import TemplateTypeRepository from '../TemplateType'
import BaseRepository from '../repository'

// MongoDB implementation
@Service()
export default class TemplateRepository extends BaseRepository<Template>
  implements ITemplateRepository<Template> {
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
  }: Template): Promise<Template> {
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
        .then((template) => new Template(template.toObject()))
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
    }: Template
  ): Promise<Template> {
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
        .then((template) => new Template(template.toObject()))
    )
  }

  public async find(query: Template): Promise<Template[]> {
    const realQuery = {}

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key]
    }

    return TemplateModel.find(realQuery)
      .then((templates) =>
        templates.map((template) => new Template(template.toObject()))
      )
  }

  public async delete(id: IId): Promise<Template> {
    return TemplateModel.findByIdAndDelete(id).then(
      (template) => new Template(template)
    )
  }
}
