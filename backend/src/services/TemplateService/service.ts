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

  public async deleteTemplate(id: IId) {
    return this.templateRepository.delete(id)
  }

  public async updateTemplate(id: IId, template: Template) {
    return this.templateRepository.update(id, template)
  }

  public async findTemplate(template: Template) {
    return this.templateRepository.find(template)
  }
}