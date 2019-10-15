import express from "express";

import { json, urlencoded } from "body-parser";

import cors from "cors";
import passport from "passport";

import serverSetup from "./setup";

import { DEV_PORT } from "./config/express";

const logger = require("morgan");

const _init = async () => {
  let app = express();
  
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true }));

  app.use(cors());

  app.use(logger("dev")); 

  app.use(passport.initialize());

  // Initialize database, authentication, routes, etc ...
  await serverSetup(app, passport);
  
  app.listen(DEV_PORT, () => console.log(`App listening on port ${DEV_PORT}`));
};

_init();