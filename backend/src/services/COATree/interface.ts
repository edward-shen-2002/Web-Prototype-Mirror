import COATree from '../../entities/COATree'
import { IId } from '../../models/interface'

export default interface ICOATreeService {
  createCOATree: (COATree: COATree) => void
  deleteCOATree: (id: IId) => void
  updateCOATree: (id: IId, COATree: COATree) => void
  findCOATree: (COATree: COATree) => Promise<COATree[]>
}
