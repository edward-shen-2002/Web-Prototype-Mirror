import SheetName from '../../entities/SheetName'
import { IId } from '../../models/interface'

export default interface ISheetNameService {
  createSheetName: (sheetName: SheetName) => void
  deleteSheetName: (id: IId) => void
  updateSheetName: (id: IId, sheetName: SheetName) => void
  findSheetName: (sheetName: SheetName) => Promise<SheetName[]>
}
