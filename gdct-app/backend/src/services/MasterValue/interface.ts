import MasterValue from '../../entities/MasterValue'
import { IId } from '../../models/interface'

export default interface IMasterValueService {
  createMasterValue: (masterValue: MasterValue) => void
  deleteMasterValue: (id: IId) => void
  updateMasterValue: (id: IId, masterValue: MasterValue) => void
  findMasterValue: (masterValue: MasterValue) => Promise<MasterValue[]>
}
