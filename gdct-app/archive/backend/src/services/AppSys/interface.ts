import AppSys from '../../entities/AppSys'
import { IId } from '../../models/interface'

export default interface IAppSysService {
  createAppSys: (AppSys: AppSys) => void
  deleteAppSys: (id: IId) => void
  updateAppSys: (id: IId, AppSys: AppSys) => void
  findAppSys: (AppSys: AppSys) => Promise<AppSys[]>
}
