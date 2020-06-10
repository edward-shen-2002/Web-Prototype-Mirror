import express from 'express'

import 'reflect-metadata'

import { json, urlencoded } from 'body-parser'

import cors from 'cors'
import passport from 'passport'
import compression from 'compression'

import { Container } from 'typedi'
import TemplateController from './controllers/Template'
import Database from './loaders/database'
import StatusController from './controllers/Status'
import TemplateTypeController from './controllers/TemplateType'
import { PORT } from './configs/host'
import TemplatePackageController from './controllers/TemplatePackage'
import SubmissionPeriodController from './controllers/SubmissionPeriod'
import ReportingPeriodController from './controllers/ReportingPeriod'
import COAController from './controllers/COA'
import COATreeController from './controllers/COATree'
import COAGroupController from './controllers/COAGroup'
import SheetNameController from './controllers/SheetName'
import AppSysController from './controllers/AppSys'
import AppRoleController from './controllers/AppRole'
import AppSysRoleController from './controllers/AppSysRole'
import SubmissionController from './controllers/Submission'
import ColumnNameController from './controllers/ColumnName'

// https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications
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

// ! No auth for now - Direct connection to router
// ! Change these base routes 

app.use('/template_manager', Container.get(TemplateController))
app.use('/template_manager', Container.get(TemplatePackageController))
app.use('/template_manager', Container.get(TemplateTypeController))

app.use('/designer', Container.get(StatusController))
app.use('/', Container.get(ReportingPeriodController))

app.use('/submission_manager', Container.get(SubmissionPeriodController))
app.use('/submission_manager', Container.get(SubmissionController))

app.use('/', Container.get(SheetNameController))
app.use('/', Container.get(ColumnNameController))

app.use('/COA_manager', Container.get(COAController))
app.use('/COA_manager', Container.get(COATreeController))
app.use('/COA_manager', Container.get(COAGroupController))

app.use('/appsys_manager', Container.get(AppSysController))
app.use('/approle_manager', Container.get(AppRoleController))
app.use('/appsysrole_manager', Container.get(AppSysRoleController))

export default app
