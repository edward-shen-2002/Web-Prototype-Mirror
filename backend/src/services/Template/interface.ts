import Template from '../../entities/Template'
import { IId } from '../../models/interface'

export default interface ITemplateService {
  createTemplate: (template: Template) => void
  deleteTemplate: (id: IId) => void
  updateTemplate: (id: IId, template: Template) => void
  findTemplate: (template: Template) => Promise<Template[]>
}
