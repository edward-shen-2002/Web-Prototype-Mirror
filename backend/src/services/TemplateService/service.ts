import ITemplateService from "./interface";
import Template from "../../entities/Template";
import { IId } from "../../models/interface";
import { Service } from "typedi";
import TemplateRepository from "../../repositories/Template";

@Service()
export default class TemplateService implements ITemplateService {
  constructor(
    private templateRepository: TemplateRepository
  ) {}

  public createTemplate(
    {
      name,
      templateData,
      templateTypeId,
      userCreatorId,
      creationDate,
      expirationDate,
      statusId
    }: Template
  ) {
    
  }

  public deleteTemplate(id: IId) {

  }

  public updateTemplate(id: IId, template: Template) {

  }
}