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
import TemplatePackageController from './controllers/designer/TemplatePackage'

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
app.use('/designer', Container.get(TemplateController)({ router: Router() }))
app.use('/designer', Container.get(StatusController)({ router: Router() }))
app.use('/designer', Container.get(TemplateTypeController)({ router: Router() }))
app.use('/designer', Container.get(TemplatePackageController)({ router: Router() }))

export default app
