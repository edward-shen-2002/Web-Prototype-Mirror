import { Schema, model } from 'mongoose'
import IAppResourceDocument from './interface'

const AppResourceModel = model<IAppResourceDocument>(
  'AppRoleResource',
  new Schema(
    {
      name: { type: String },
      path: { type: String },
      contextRoot: { type: String },
      isProtected: { type: Boolean }
    },
    { minimize: false }
  )
)

export default AppResourceModel
