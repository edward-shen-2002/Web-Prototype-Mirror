import AppSysRole from '../../entities/AppSysRole'
import { IId } from '../../models/interface'

export default interface IAppSysRoleService {
  createAppSysRole: (AppSysRole: AppSysRole) => void
  deleteAppSysRole: (id: IId) => void
  updateAppSysRole: (id: IId, AppSysRole: AppSysRole) => void
  findAppSysRole: (AppSysRole: AppSysRole) => Promise<AppSysRole[]>
}
