import express, { Router } from 'express'

import 'reflect-metadata'

import { json, urlencoded } from 'body-parser'

import cors from 'cors'
import passport from 'passport'
import compression from 'compression'

import { Container } from 'typedi'
import TemplateController from './controllers/designer/Template'
import Database from './loaders/database'
import StatusController from './controllers/dimension/Status'
import TemplateTypeController from './controllers/designer/TemplateType'
import { PORT } from './configs/host'

// import AppRoleModel from './models/AppRole'
// import AppResourceModel from './models/AppResource'
// import AppRoleResourceModel from './models/AppRoleResource'
// import AppSysModel from './models/AppSys'
// import ChartOfAccountsModel from './models/ChartOfAccounts'
// import ChartOfAccountsGroupModel from './models/ChartOfAccountsGroup'
// import ChartOfAccountsTreeModel from './models/ChartOfAccountsTree'
// import ColumnNameModel from './models/ColumnName'
// import MasterValueModel from './models/MasterValue'
// import OrganizationModel from './models/Organization'
// import OrganizationGroupModel from './models/OrganizationGroup'
// import ProgramModel from './models/Program'
// import ReportingPeriodModel from './models/ReportingPeriod'
// import SheetNameModel from './models/SheetName'
// import StatusModel from './models/Status'
// import SubmissionModel from './models/Submission'
// import TemplateModel from './models/Template'
// import TemplateTypeModel from './models/TemplateType/model'
// import UserModel from './models/User'
// import UserSysRoleModel from './models/UserSysRole'

const logger = require('morgan')

const app = express()

app.set('port', process.env.PORT || PORT)

app.use(json({ limit: '50mb' }))
app.use(urlencoded({ extended: true }))

app.use(cors())

app.use(compression())

app.use(logger('dev'))

app.use(passport.initialize())

export const dbUtil = new Database()

dbUtil.connect()

// AppRoleModel.createCollection()
// AppResourceModel.createCollection()
// AppRoleResourceModel.createCollection()
// AppSysModel.createCollection()
// ChartOfAccountsModel.createCollection()
// ChartOfAccountsGroupModel.createCollection()
// ChartOfAccountsTreeModel.createCollection()
// ColumnNameModel.createCollection()
// MasterValueModel.createCollection()
// OrganizationModel.createCollection()
// OrganizationGroupModel.createCollection()
// ProgramModel.createCollection()
// ReportingPeriodModel.createCollection()
// SheetNameModel.createCollection()
// StatusModel.createCollection()
// SubmissionModel.createCollection()
// TemplateModel.createCollection()
// TemplateTypeModel.createCollection()
// UserModel.createCollection()
// UserSysRoleModel.createCollection()

// ! No auth for now - Direct connection to router
app.use('/root', Container.get(TemplateController)({ router: Router() }))
app.use('/root', Container.get(StatusController)({ router: Router() }))
app.use('/root', Container.get(TemplateTypeController)({ router: Router() }))

export default app
