import TemplateEntity from '../../entities/Template'
import TemplateModel from '../../models/Template'
import StatusRepository from '../Status'
import UserRepository from '../User'
import Container, { Service } from 'typedi'
import TemplateTypeRepository from '../TemplateType'
import BaseRepository from '../repository'

// MongoDB implementation
// @Service()
export default class TemplateRepository extends BaseRepository {
  constructor() {
    super(TemplateModel)

    this.statusRepository = Container.get(StatusRepository)
    this.userRepository = Container.get(UserRepository)
    this.templateTypeRepository = Container.get(TemplateTypeRepository)
  }

  async create({
    name,
    templateData,
    templateTypeId,
    userCreatorId,
    creationDate,
    expirationDate,
    statusId
  }) {
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

  async update(
    id,
    {
      name,
      templateData,
      templateTypeId,
      userCreatorId,
      creationDate,
      expirationDate,
      statusId
    }
  ) {
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

  async find(query) {
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
