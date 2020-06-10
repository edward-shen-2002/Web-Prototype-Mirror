import { IAppSysRole } from '../../models/AppSysRole/interface'
import { IId } from '../../models/interface'

export default interface IAppSysRoleEntity extends IAppSysRole {
  _id?: IId
}
