import setupDatabases from "./databases";

import setupRouteGroups from "./routes";

import setupAuthentication from "./authentication";

import { Strategy as LocalStrategy } from "passport-local";

// MongoDB models
import UserModel from "../models/user/User";
import OrganizationModel from "../models/organization/Organization";
import RegistrationModel from "../models/user/Registration";
import RegisterVerificationModel from "../models/user/RegisterVerification";
import SectorModel from "../models/sector/Sector";
import TemplateModel from "../models/template/Template";
import BusinessConceptModel from "../models/template/BusinessConcept";
import BundleModel from "../models/bundle/Bundle";
import OrganizationBundleModel from "../models/bundle/OrganizationBundle";
import SubmissionModel from "../models/submission/Submission";
import OrganizationGroupModel from "../models/organizationGroup/OrganizationGroup";
import ProgramModel from "../models/program/Program";
import MasterValueModel from "../models/masterValue/MasterValue";

const serverSetup = async (app, passport, options = {}) => {
  const helpers = { 
    app, 
    passport, 
    UserModel, 
    OrganizationModel, 
    RegistrationModel, 
    RegisterVerificationModel, 
    SectorModel, 
    TemplateModel, 
    BusinessConceptModel,
    BundleModel,
    OrganizationBundleModel,
    MasterValueModel,
    SubmissionModel,
    OrganizationGroupModel,
    ProgramModel
  };
  
  passport.use(new LocalStrategy(UserModel.authenticate()));

  await setupDatabases(options, helpers);

  setupAuthentication(helpers);
  
  setupRouteGroups(helpers);
};

export default serverSetup;