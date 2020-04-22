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

  public async createTemplate(
    template: Template
  ) {
    return this.templateRepository.create(template)
      .catch((error) => { throw error })
  }

  public deleteTemplate(id: IId) {
    return this.templateRepository.delete(id)
  }

  public updateTemplate(id: IId, template: Template) {
    return this.templateRepository.update(id, template)
  }
}