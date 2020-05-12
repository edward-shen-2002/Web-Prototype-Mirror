import COAGroup from '../../entities/COAGroup'
import { IId } from '../../models/interface'

export default interface ICOAGroupService {
  createCOAGroup: (COAGroup: COAGroup) => void
  deleteCOAGroup: (id: IId) => void
  updateCOAGroup: (id: IId, COAGroup: COAGroup) => void
  findCOAGroup: (COAGroup: COAGroup) => Promise<COAGroup[]>
}
