import ITemplateTypeService from './interface'
import TemplateType from '../../entities/TemplateType'
import { IId } from '../../models/interface'
import Container, { Service, Inject } from 'typedi'
import TemplateTypeRepository from '../../repositories/TemplateType'

@Service()
export default class TemplateTypeService implements ITemplateTypeService {
  private templateTypeRepository: TemplateTypeRepository

  constructor() {
    this.templateTypeRepository = Container.get(TemplateTypeRepository)
  }

  public async createTemplateType(templateType: TemplateType) {
    return this.templateTypeRepository.create(templateType).catch((error) => {
      throw error
    })
  }

  public async deleteTemplateType(id: IId) {
    return this.templateTypeRepository.delete(id)
  }

  public async updateTemplateType(id: IId, templateType: TemplateType) {
    return this.templateTypeRepository.update(id, templateType)
  }

  public async findTemplateType(templateType: TemplateType) {
    return this.templateTypeRepository.find(templateType)
  }
}
