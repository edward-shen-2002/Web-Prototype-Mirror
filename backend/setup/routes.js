import { Router } from "express";

import { 
  userAuthenticationMiddleware, 

  verificationMiddleware, 
  
  userRoleMiddleware, 
  organizationRoleMiddleware, 
  sectorRoleMiddleware,
  templateRoleMiddleware,
  bundleRoleMiddleware,
  businessConceptRoleMiddleware,

  editBundleRoleMiddleware,
  reviewBundleRoleMiddleware,
  approveBundleRoleMiddleware,

  generalErrorHandler 
} from "./authentication";

// Route controllers
import loginController from "../controller/public/login";
import registerController from "../controller/public/register";
import dataController from "../controller/public/data";

// Verification controllers
import verificationController from "../controller/verification/verification";

// Auth controllers
import logoutController from "../controller/auth/logout";
import reconnectController from "../controller/auth/reconnect";

// Admin controllers
import usersController from "../controller/admin/user_manager/users";
import registrationController from "../controller/admin/user_manager/registrations";
import organizationController from "../controller/admin/organization_manager/organizations";
import sectorController from "../controller/admin/sector_manager/sectors";
import templateController from "../controller/admin/template_manager/templates";
import businessConceptController from "../controller/admin/business_concept_manager/businessConcepts";
import bundleController from "../controller/admin/bundle_manager/bundles";

import editBundleController from "../controller/admin/edit_bundle_manager/editBundles";
import reviewBundleController from "../controller/admin/review_bundle_manager/reviewBundles";
import approveBundleController from "../controller/admin/approve_bundle_manager/approveBundles";

import { 
  ROUTE_GROUP_PUBLIC, 
  ROUTE_GROUP_AUTH, 
  ROUTE_GROUP_ADMIN, 
  ROUTE_GROUP_ADMIN_USER, 
  ROUTE_GROUP_VERIFICATION, 
  ROUTE_GROUP_ADMIN_ORGANIZATION, 
  ROUTE_GROUP_ADMIN_SECTOR, 
  ROUTE_GROUP_ADMIN_TEMPLATE,
  ROUTE_GROUP_ADMIN_BUNDLE,
  ROUTE_GROUP_ADMIN_EDIT_BUNDLE,
  ROUTE_GROUP_ADMIN_REVIEW_BUNDLE,
  ROUTE_GROUP_ADMIN_APPROVE_BUNDLE,
  ROUTE_GROUP_ADMIN_BUSINESS_CONCEPT
} from "../constants/rest";

/**
 * Routes which require user authentication -- must pass through the authentication middleware.
 */
const authRoutes = (helpers) => {
  const { passport } = helpers;
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
  dataController({ ...helpers, router });

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

const organizationRoleRoutes = (helpers) => {
  let router = new Router();

  router.use(organizationRoleMiddleware());

  organizationController({ ...helpers, router });

  return router;
};

const sectorRoleRoutes = (helpers) => {
  let router = new Router();

  router.use(sectorRoleMiddleware());

  sectorController({ ...helpers, router });

  return router;
};

const templateRoleRoutes = (helpers) => {
  let router = new Router();

  router.use(templateRoleMiddleware());

  templateController({ ...helpers, router }); 

  return router;
};

const bundleRoleRoutes = (helpers) => {
  let router = new Router();

  router.use(bundleRoleMiddleware());

  bundleController({ ...helpers, router });

  return router;
};

const editBundleRoleRoutes = (helpers) => {
  let router = new Router();

  router.use(editBundleRoleMiddleware());

  editBundleController({ ...helpers, router });

  return router;
};

const reviewBundleRoleRoutes = (helpers) => {
  let router = new Router();

  router.use(reviewBundleRoleMiddleware());

  reviewBundleController({ ...helpers, router });

  return router;
};

const approveBundleRoleRoutes = (helpers) => {
  let router = new Router();

  router.use(approveBundleRoleMiddleware());

  approveBundleController({ ...helpers, router });

  return router;
};

const businessConceptRoleRoutes = (helpers) => {
  let router = new Router();

  router.use(businessConceptRoleMiddleware());

  businessConceptController({ ...helpers, router }); 
  
  return router;
};


// Routes are grouped to fully utilize shared middleware
const setupRouteGroups = (helpers) => {
  console.log("REST: Setting up routes");
  
  const { app } = helpers;
  
  try {
    app.use(ROUTE_GROUP_PUBLIC, publicRoutes(helpers));
    app.use(ROUTE_GROUP_AUTH, authRoutes(helpers));
  
    app.use(ROUTE_GROUP_VERIFICATION, verificationRoutes(helpers));
    
    // Admin routes
    // Worflow routes - edit/review/approve bundles
    app.use(ROUTE_GROUP_ADMIN, adminRoutes(helpers), generalErrorHandler());
    app.use(ROUTE_GROUP_ADMIN_USER, userRoleRoutes(helpers), generalErrorHandler());
    app.use(ROUTE_GROUP_ADMIN_ORGANIZATION, organizationRoleRoutes(helpers), generalErrorHandler());
    app.use(ROUTE_GROUP_ADMIN_SECTOR, sectorRoleRoutes(helpers), generalErrorHandler());
    app.use(ROUTE_GROUP_ADMIN_TEMPLATE, templateRoleRoutes(helpers), generalErrorHandler());
    app.use(ROUTE_GROUP_ADMIN_BUNDLE, bundleRoleRoutes(helpers), generalErrorHandler());
    app.use(ROUTE_GROUP_ADMIN_BUSINESS_CONCEPT, businessConceptRoleRoutes(helpers), generalErrorHandler());

    app.use(ROUTE_GROUP_ADMIN_EDIT_BUNDLE, editBundleRoleRoutes(helpers), generalErrorHandler());
    app.use(ROUTE_GROUP_ADMIN_REVIEW_BUNDLE, reviewBundleRoleRoutes(helpers), generalErrorHandler());
    app.use(ROUTE_GROUP_ADMIN_APPROVE_BUNDLE, approveBundleRoleRoutes(helpers), generalErrorHandler());
    
    console.log("REST: Successfully set up routes");
  } catch(error) {
    throw `REST: Failed to set up routes\n${error}`;
  }
};

export default setupRouteGroups;