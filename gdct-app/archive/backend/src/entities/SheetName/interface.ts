import { ISheetName } from '../../models/SheetName/interface'
import { IId } from '../../models/interface'

export default interface ISheetNameEntity extends ISheetName {
  _id?: IId
}
