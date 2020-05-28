import AppRole from '../../entities/AppRole'
import { IId } from '../../models/interface'

export default interface IAppRoleService {
  createAppRole: (AppRole: AppRole) => void
  deleteAppRole: (id: IId) => void
  updateAppRole: (id: IId, AppRole: AppRole) => void
  findAppRole: (AppRole: AppRole) => Promise<AppRole[]>
}
