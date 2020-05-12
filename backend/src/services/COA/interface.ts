import COA from '../../entities/COA'
import { IId } from '../../models/interface'

export default interface ICOAService {
  createCOA: (COA: COA) => void
  deleteCOA: (id: IId) => void
  updateCOA: (id: IId, COA: COA) => void
  findCOA: (COA: COA) => Promise<COA[]>
}
