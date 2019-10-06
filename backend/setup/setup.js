import setupDatabases from "./databases";

import setupRouteGroups from "./routes";

import setupAuthentication from "./authentication";

import { Strategy as LocalStrategy } from "passport-local";
import passportLocalMongoose from "passport-local-mongoose";

// MongoDB models
import UserModel from "../model/User";


const serverSetup = async (app, passport, options = {}) => {
  const helpers = { UserModel };
  
  passport.use(new LocalStrategy(UserModel.authenticate()));

  await setupDatabases(options, helpers);

  setupAuthentication(passport, helpers);
  
  setupRouteGroups(app, passport, helpers);
};

export default serverSetup;