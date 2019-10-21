import setupDatabases from "./databases";

import setupRouteGroups from "./routes";

import setupAuthentication from "./authentication";

import { Strategy as LocalStrategy } from "passport-local";

// MongoDB models
import UserModel from "../models/User";


const serverSetup = async (app, passport, options = {}) => {
  const helpers = { app, passport, UserModel };
  
  passport.use(new LocalStrategy(UserModel.authenticate()));

  await setupDatabases(options, helpers);

  setupAuthentication(helpers);
  
  setupRouteGroups(helpers);
};

export default serverSetup;