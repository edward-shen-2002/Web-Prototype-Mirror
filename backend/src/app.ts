import express, { Router } from 'express'

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
app.use('/designer', Container.get(TemplateController))
app.use('/designer', Container.get(StatusController))
app.use('/designer', Container.get(TemplateTypeController))
app.use('/designer', Container.get(TemplatePackageController))
app.use('/designer', Container.get(SubmissionPeriodController))
app.use('/designer', Container.get(ReportingPeriodController))

export default app
