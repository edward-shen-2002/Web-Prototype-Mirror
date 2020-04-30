import { Schema, model } from 'mongoose'
import IAppRoleResourceDocument from './interface'

const ObjectId = Schema.Types.ObjectId

const AppRoleResourceModel = model<IAppRoleResourceDocument>(
  'AppRoleResource',
  new Schema(
    {
      appResourceId: { type: ObjectId, ref: "AppResource" },
      appSysRoleId: { type: ObjectId, ref: "AppSysRole" }
    },
    { minimize: false }
  )
)

export default AppRoleResourceModel
