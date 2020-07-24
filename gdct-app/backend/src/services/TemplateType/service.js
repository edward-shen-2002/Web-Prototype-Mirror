import Container from 'typedi';
import TemplateTypeRepository from '../../repositories/TemplateType';

// @Service()
export default class TemplateTypeService {
  constructor() {
    this.templateTypeRepository = Container.get(TemplateTypeRepository);
  }

  async createTemplateType(templateType) {
    return this.templateTypeRepository.create(templateType);
  }

  async deleteTemplateType(id) {
    return this.templateTypeRepository.delete(id);
  }

  async updateTemplateType(id, templateType) {
    return this.templateTypeRepository.update(id, templateType);
  }

  async findTemplateType(templateType) {
    return this.templateTypeRepository.find(templateType);
  }

  async findTemplateTypeByProgramIds(programIds) {
    return this.templateTypeRepository.findByProgramIds(programIds);
  }
}
