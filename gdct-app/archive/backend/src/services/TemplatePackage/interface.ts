import TemplatePackage from '../../entities/TemplatePackage'
import { IId } from '../../models/interface'

export default interface ITemplatePackageService {
  createTemplatePackage: (template: TemplatePackage) => void
  deleteTemplatePackage: (id: IId) => void
  updateTemplatePackage: (id: IId, template: TemplatePackage) => void
  findTemplatePackage: (template: TemplatePackage) => Promise<TemplatePackage[]>
}
