import ITemplatePackageService from './interface'
import TemplatePackage from '../../entities/TemplatePackage'
import { IId } from '../../models/interface'
import Container, { Service, Inject } from 'typedi'
import TemplatePackageRepository from '../../repositories/TemplatePackage'

@Service()
export default class TemplatePackageService implements ITemplatePackageService {
  private templatePackageRepository: TemplatePackageRepository

  constructor() {
    this.templatePackageRepository = Container.get(TemplatePackageRepository)
  }

  public async createTemplatePackage(templatePackage: TemplatePackage) {
    return this.templatePackageRepository.create(templatePackage)
  }

  public async deleteTemplatePackage(id: IId) {
    return this.templatePackageRepository.delete(id)
  }

  public async updateTemplatePackage(id: IId, templatePackage: TemplatePackage) {
    return this.templatePackageRepository.update(id, templatePackage)
  }

  public async findTemplatePackage(templatePackage: TemplatePackage) {
    return this.templatePackageRepository.find(templatePackage)
  }
}
