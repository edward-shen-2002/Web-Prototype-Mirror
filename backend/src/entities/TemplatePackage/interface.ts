import { ITemplatePackage } from '../../models/TemplatePackage/interface'
import { IId } from '../../models/interface'

export default interface ITemplatePackageEntity extends ITemplatePackage {
  _id?: IId
}
