import { Router } from "express";

import { userAuthenticationMiddleware, verificationMiddleware, userRoleMiddleware, organizationRoleMiddleware, dataRoleMiddleware, generalErrorHandler} from "./authentication";

// Route controllers
import loginController from "../controller/public/login";
import registerController from "../controller/public/register";
import reconnectController from "../controller/auth/reconnect";
import logoutController from "../controller/auth/logout";
import verificationController from "../controller/verification/verification";

// Admin controllers
import usersController from "../controller/admin/user_manager/users";
import registrationController from "../controller/admin/user_manager/registrations";

import dataGroupsController from "../controller/admin/data_manager/dataGroups";

import { ROUTE_GROUP_PUBLIC, ROUTE_GROUP_AUTH, ROUTE_GROUP_ADMIN, ROUTE_GROUP_ADMIN_USER, ROUTE_GROUP_ADMIN_DATA, ROUTE_GROUP_VERIFICATION } from "../constants/rest";

/**
 * Routes which require user authentication -- must pass through the authentication middleware.
 */
const authRoutes = ({ passport }) => {
  let router = new Router();

  // Authentication middleware -- All requests with the corresponsing app route must go through this middleware first
  router.use(userAuthenticationMiddleware({ passport }));

  reconnectController({ router });
  logoutController({ router });

  return router;
};

/**
 * Registration verification
 */
const verificationRoutes = (helpers) => {
  let router = new Router();

  router.use(verificationMiddleware({ ...helpers }));
  
  verificationController({ ...helpers, router });

  return router;
};

/**
 * Routes which do not require logged in authentication.
 */
const publicRoutes = (helpers) => {
  let router = new Router();
  
  loginController({ ...helpers, router });
  registerController({ ...helpers, router });

  return router;
};

/**
 * Routes which require authentication -- config shared among all admin route groups
 */
const adminRoutes = ({ passport }) => {
  let router = new Router();

  router.use(userAuthenticationMiddleware({ passport }));

  return router;
};

const userRoleRoutes = (helpers) => {
  let router = new Router();
  
  router.use(userRoleMiddleware());

  usersController({ ...helpers, router });
  registrationController({ ...helpers, router });

  return router;
};

const dataRoleRoutes = (helpers) => {
  let router = new Router();

  router.use(dataRoleMiddleware());

  dataGroupsController({ ...helpers, router });

  return router;
};

const organizationRoleRoutes = (helpers) => {
  let router = new Router();

  router.use(organizationRoleMiddleware());

  return router;
};

// Routes are grouped to fully utilize shared middleware
const setupRouteGroups = (helpers) => {
  const { app } = helpers;

  app.use(ROUTE_GROUP_PUBLIC, publicRoutes(helpers));
  app.use(ROUTE_GROUP_AUTH, authRoutes(helpers));

  app.use(ROUTE_GROUP_VERIFICATION, verificationRoutes(helpers));

  // Admin routes
  // ?Is separating roles to different routes necessary?
  app.use(ROUTE_GROUP_ADMIN, adminRoutes(helpers), generalErrorHandler());
  app.use(ROUTE_GROUP_ADMIN_USER, userRoleRoutes(helpers), generalErrorHandler());
  app.use(ROUTE_GROUP_ADMIN_DATA, dataRoleRoutes(helpers), generalErrorHandler());
};

export default setupRouteGroups;