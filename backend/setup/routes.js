import { Router } from "express";

import { userAuthenticationMiddleware } from "./authentication";

import { 
  ROUTE_GROUP_PUBLIC, 
  ROUTE_GROUP_AUTH
} from "../config/constants";



/**
 * Routes which require user authentication -- must pass through the authentication middleware.
 */
const authRoutes = (helpers) => {
  let router = new Router();

  // Authentication middleware -- All requests with the corresponsing app route must go through this middleware first
  router.use(userAuthenticationMiddleware);

  return router;
};

/**
 * Routes which do not require authentication.
 */
const publicRoutes = (helpers) => {
  let router = new Router();
  
  return router;
};

// Routes are grouped to fully utilize shared middleware
const setupRouteGroups = (app, passport, helpers) => {
  app.use(ROUTE_GROUP_PUBLIC, publicRoutes(helpers));
  app.use(ROUTE_GROUP_AUTH, authRoutes(passport, helpers));
};

export default setupRouteGroups;