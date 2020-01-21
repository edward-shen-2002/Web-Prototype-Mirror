import express from "express";

import { json, urlencoded } from "body-parser";

import cors from "cors";
import passport from "passport";
import compression from "compression";

import serverSetup from "./setup";

import path from "path";

const logger = require("morgan");

const _init = async () => {
  let app = express();

  app.set("port", process.env.PORT || 3000);
  
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true }));

  app.use(cors());

  app.use(compression());

  app.use(logger("dev")); 

  app.use(passport.initialize());
  
  // Initialize database, authentication, routes, etc ...
  await serverSetup(app, passport, { wipeDatabase: false, createDummyUser: true });

  // Connects frontend build
  app.use("/", express.static(path.join(__dirname, "public")));
  app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
  app.listen(app.get("port"), () => console.log(`App listening on port ${app.get("port")}`));
  return app;
};

_init();