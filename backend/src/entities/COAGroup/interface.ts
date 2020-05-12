import { ICOAGroup } from '../../models/COAGroup/interface'
import { IId } from '../../models/interface'

export default interface ICOAGroupEntity extends ICOAGroup {
  _id?: IId
}
