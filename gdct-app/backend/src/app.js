import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import 'reflect-metadata';

import { json, urlencoded } from 'body-parser';

import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
import compression from 'compression';

import { Container } from 'typedi';
import { PORT } from './configs/host';
import Database from './loaders/database';

import TemplateController from './controllers/Template';
import StatusController from './controllers/Status';
import ProgramController from './controllers/Program';
import TemplateTypeController from './controllers/TemplateType';
import TemplatePackageController from './controllers/TemplatePackage';
import SubmissionPeriodController from './controllers/SubmissionPeriod';
import ReportingPeriodController from './controllers/ReportingPeriod';
import COAController from './controllers/COA';
import COATreeController from './controllers/COATree';
import COAGroupController from './controllers/COAGroup';
import OrgController from './controllers/Organization';
import SheetNameController from './controllers/SheetName';
import AppSysController from './controllers/AppSys';
import AppRoleController from './controllers/AppRole';
import AppSysRoleController from './controllers/AppSysRole';
import SubmissionController from './controllers/Submission';
import ColumnNameController from './controllers/ColumnName';
import UserController from './controllers/User';
import AuthController from './controllers/Auth';
import ErrorController from './controllers/errorController';
import Auth from './interceptors';
import AppRoleResourceController from './controllers/AppRoleResource/controller';
import AppResourceController from './controllers/AppResource';
import WorkflowController from './controllers/Workflow';

// https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications
const logger = require('morgan');

const app = express();
const cookieParser = require('cookie-parser');

export const dbUtil = new Database();

dbUtil.connect();

app.set('port', process.env.PORT || PORT);

app.use(cookieParser());
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ extended: true }));

// app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3003' }));

app.use(compression());

app.use(logger('dev'));

const CookieStore = mongoStore(session);
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
import './configs/passport';

app.use((req, res, next) => {
  console.log('my middlewares:', req.user, req.cookies.connect_sid);
  next();
});

app.use('/', Container.get(ProgramController));
app.use('/', Container.get(ReportingPeriodController));
app.use('/', Container.get(SheetNameController));
app.use('/', Container.get(ColumnNameController));
app.use('/', Container.get(OrgController));

app.use('/public', Container.get(UserController));
app.use('/auth', Container.get(AuthController));

app.use('/template_manager', Container.get(TemplateController));
app.use('/template_manager', Container.get(TemplatePackageController));
app.use('/template_manager', Container.get(TemplateTypeController));

app.use('/designer', Container.get(StatusController));

app.use('/submission_manager', Container.get(SubmissionPeriodController));
app.use('/submission_manager', Container.get(SubmissionController));

app.use('/COA_manager', Container.get(COAController));
app.use('/COA_manager', Container.get(COATreeController));
app.use('/COA_manager', Container.get(COAGroupController));

app.use('/appsys_manager', Container.get(AppSysController));
app.use('/approle_manager', Container.get(AppRoleController));
app.use('/appsysrole_manager', Container.get(AppSysRoleController));

app.use('/workflow_manager', Container.get(WorkflowController));

app.use(
  '/role_manager',
  // Container.get(Auth).authenticated,
  // Container.get(Auth).authorized,
  Container.get(AppSysController)
);
app.use(
  '/role_manager',
  // Container.get(Auth).authenticated,
  // Container.get(Auth).authorized,
  Container.get(AppRoleController)
);
app.use(
  '/role_manager',
  // Container.get(Auth).authenticated,
  // Container.get(Auth).authorized,
  Container.get(AppSysRoleController)
);
app.use(
  '/role_manager',
  // Container.get(Auth).authenticated,
  // Container.get(Auth).authorized,
  Container.get(AppRoleResourceController)
);
app.use(
  '/role_manager',
  // Container.get(Auth).authenticated,
  // Container.get(Auth).authorized,
  Container.get(AppResourceController)
);

app.use(Container.get(ErrorController).process);

export default app;
