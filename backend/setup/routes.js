import { Router } from "express";

import { userAuthenticationMiddleware, userRoleMiddleware, organizationRoleMiddleware, dataRoleMiddleware} from "./authentication";

// Route controllers
import loginController from "../controller/public/login";
import registerController from "../controller/public/register";
import reconnectController from "../controller/auth/reconnect";
import logoutController from "../controller/auth/logout";

// Admin controllers
import usersController from "../controller/admin/user_manager/users";

import dataGroupsController from "../controller/admin/data_manager/dataGroups";

import { ROUTE_GROUP_PUBLIC, ROUTE_GROUP_AUTH, ROUTE_GROUP_ADMIN, ROUTE_GROUP_ADMIN_USER, ROUTE_GROUP_ADMIN_DATA} from "../constants/rest";

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
 * Routes which do not require authentication.
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

  // Admin routes
  // ?Is separating roles to different routes necessary?
  app.use(ROUTE_GROUP_ADMIN, adminRoutes(helpers));
  app.use(ROUTE_GROUP_ADMIN_USER, userRoleRoutes(helpers));
  app.use(ROUTE_GROUP_ADMIN_DATA, dataRoleRoutes(helpers));
};

export default setupRouteGroups;