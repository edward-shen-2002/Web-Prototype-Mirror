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

const logger = require('morgan')

// TODO: Promise here
const _init = async () => {
  const app = express()

  app.set('port', process.env.PORT || 3000)

  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ extended: true }))

  app.use(cors())

  app.use(compression())

  app.use(logger('dev'))

  app.use(passport.initialize())

  const dbUtil = new Database()
  await dbUtil.initialize()

  // ! No auth for now - Direct connection to router
  app.use('/root', Container.get(TemplateController)({ router: Router() }))
  app.use('/root', Container.get(StatusController)({ router: Router() }))
  app.use('/root', Container.get(TemplateTypeController)({ router: Router() }))

  const port = app.get('port')

  app.listen(port, () => console.log(`App listening on port ${port}`))

  return app
}

_init()
