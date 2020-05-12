import { ICOA } from '../../models/COA/interface'
import { IId } from '../../models/interface'

export default interface ICOAEntity extends ICOA {
  _id?: IId
}
