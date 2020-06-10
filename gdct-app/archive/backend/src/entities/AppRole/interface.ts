import { IAppRole } from '../../models/AppRole/interface'
import { IId } from '../../models/interface'

export default interface IAppRoleEntity extends IAppRole {
  _id?: IId
}
