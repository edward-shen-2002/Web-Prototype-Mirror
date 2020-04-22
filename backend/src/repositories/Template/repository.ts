import ITemplateRepository from "./interface";
import Template from "../../entities/Template";
import TemplateModel from "../../models/Template";
import { IId } from "../../models/interface";
import StatusRepository from "../Status";
import UserRepository from "../User";
import { ITemplate } from "../../models/Template/interface";
import { Service } from "typedi";
import TemplateTypeRepository from "../TemplateType";
import BaseRepository from "../repository";

// MongoDB implementation
@Service()
export default class TemplateRepository extends BaseRepository<Template> implements ITemplateRepository<Template>{
  constructor(
    private statusRepository: StatusRepository,
    private userRepository: UserRepository,
    private templateTypeRepository: TemplateTypeRepository
  ) {
    super(TemplateModel)
  }

  public async create(
    {
      name,
      templateData,
      templateTypeId,
      userCreatorId,
      creationDate,
      expirationDate,
      statusId
    }: Template
  ): Promise<void> {
    return (
      this.statusRepository.validate(statusId)
        .then(() => this.userRepository.validate(userCreatorId))
        .then(() => this.templateTypeRepository.validate(templateTypeId))
        .then(
          () => (
            TemplateModel.create(
              {
                name,
                templateData,
                templateTypeId,
                userCreatorId,
                creationDate,
                expirationDate,
                statusId
              }
            )
          )
        )
        .then(() => {})
        .catch((error) => { throw error })
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
  ): Promise<void> {
    return (
      new Promise(() => { if(userCreatorId) return this.userRepository.validate(userCreatorId) })
        .then(() => { if(statusId) return this.statusRepository.validate(statusId) })
        .then(
          () => (
            TemplateModel.findByIdAndUpdate(
              id, 
              {
                name,
                templateData,
                templateTypeId,
                userCreatorId,
                creationDate,
                expirationDate,
                statusId
              } as ITemplate
            )
          )
        )
        .then(() => {})
        .catch((error) => { throw error })
    )
  }
}