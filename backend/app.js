import express from "express";

import { json, urlencoded } from "body-parser";

import cors from "cors";
import passport from "passport";

import serverSetup from "./setup";

const logger = require("morgan");

const _init = async () => {
  let app = express();

  app.set("port", process.env.PORT || 3000);
  
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true }));

  app.use(cors());

  app.use(logger("dev")); 

  app.use(passport.initialize());

  // Initialize database, authentication, routes, etc ...
  await serverSetup(app, passport, { createDummyUser: true });

  app.listen(app.get("port"), () => console.log(`App listening on port ${app.get("port")}`));
};

_init();