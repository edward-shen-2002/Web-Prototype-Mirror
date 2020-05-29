import { IAppSys } from '../../models/AppSys/interface'
import { IId } from '../../models/interface'

export default interface IAppSysEntity extends IAppSys {
  _id?: IId
}
