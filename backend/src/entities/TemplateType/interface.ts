import { ITemplateType } from '../../models/TemplateType/interface'
import { IId } from '../../models/interface'

export default interface ITemplateTypeEntity extends ITemplateType {
  _id: IId
}
