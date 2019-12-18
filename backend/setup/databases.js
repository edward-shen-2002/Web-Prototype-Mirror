import mongoose from "mongoose";

import { DATABASE_KEY } from "../config/database";

import { ROLE_LEVEL_ADMIN } from "../constants/roles";

/**
 * MongoDB set up.
 * 
 * By default, the database collections is created.
 * 
 * Options can be specified for specified for the following:
 *   createDatabase: default false
 *   wipeDatabase: default false
 *   createDummyUser: default false
 */
const setupMongoose = async (options, { 
  UserModel, 
  SectorModel, 
  OrganizationModel, 
  TemplateModel, 
  RegistrationModel, 
  RegisterVerificationModel, 
  BusinessConceptModel,
  BundleModel
}) => {
  const handleCreateDatabase = async () => {
    console.log("MongoDB: Creating collections in database");
    try {

      await UserModel.createCollection();
      await RegistrationModel.createCollection();
      await RegisterVerificationModel.createCollection();
      await OrganizationModel.createCollection();
      await SectorModel.createCollection();
      await TemplateModel.createCollection();
      await BusinessConceptModel.createCollection();
      await BundleModel.createCollection();
      
      console.log("MongoDB: Successfully created collections");
    } catch(error) {
      console.error("MongoDB: Failed to create collections", error);
    }
  };

  // Drops the collections of a database
  const handleWipeDatabase = async () => {
    console.warn("MongoDB: Dropping all collections");

    try {
      await mongoose.connection.dropDatabase();
      
      console.warn("MongoDB: Successfully dropped all collections");
    } catch(error) {
      console.error("MongoDB: Failed to drop all collections", error);
    }
  };

  // TODO: Create dummy data
  // Create or overwrite sample data in the database. The database must be already set up.
  const handleCreateDummyUser = async () => {
    try {
      console.log("MongoDB: Creating dummy data");

      const sampleSectorData = {
        name: "Health"
      };

      let sampleSector = await SectorModel.findOneAndUpdate({ name: sampleSectorData.name }, sampleSectorData, { new: true, upsert: true });;

      const sampleOrganizationData = {
        name: "MOH",
        code: "888",
        address: "5700 Yonge St, North York, ON",
        sector: { sectorId: sampleSector._id, name: sampleSector.name }
      };

      let sampleOrganization = await OrganizationModel.findOneAndUpdate({ code: sampleOrganizationData.code }, sampleOrganizationData, { new: true, upsert: true });

      const adminRoleControlConfig = { scope: ROLE_LEVEL_ADMIN, sectors: [], organizations: [] };

      const fullAdminControlRoles = {
        TEMPLATE_MANAGER: { ...adminRoleControlConfig }, 
        BUNDLE_MANAGER: { ...adminRoleControlConfig }, 
        USER_MANAGER: { ...adminRoleControlConfig }, 
        ORGANIZATION_MANAGER: { ...adminRoleControlConfig }, 
        SECTOR_MANAGER: { ...adminRoleControlConfig }, 
        SYSTEM_MANAGER: { ...adminRoleControlConfig }
      };

      let userOrganizations = {};

      userOrganizations[sampleOrganization._id] = {
        name: sampleOrganization.name,
        code: sampleOrganization.code
      };
    
      const sampleUserData = { 
        username: "sampleuser", 
        firstName: "Alfred", 
        lastName: "Lemon", 
        phoneNumber: "(999)-888-7777", 
        email: "sampleuser@hotmail.com", 
        password: "password123@", 
        organizations: userOrganizations,
        roles: fullAdminControlRoles 
      };

      let sampleUser = await UserModel.findOne({ username: "sampleuser" });

      if(!sampleUser) sampleUser = await UserModel.register({ ...sampleUserData, password: undefined }, sampleUserData.password);

      sampleOrganization.users.push(sampleUser._id);
      sampleOrganization.contact = { userId: sampleUser._id, name: sampleUser.firstName, telephone: sampleUser.phoneNumber }
      await sampleOrganization.save();

      console.log("MongoDB: Successfully created dummy data");
    } catch(error) {
      console.error("MongoDB: Failed to create dummy data", error);
    }
  };

  const init = async ({ createDatabase, wipeDatabase, createDummyUser }) => {
    try {
      console.log("MongoDB: Setting up database");

      // Connects to the database or creates it when it doesn't exist
      await mongoose.connect(DATABASE_KEY, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true });

      // Options
      if(wipeDatabase) await handleWipeDatabase();
      if(createDatabase) await handleCreateDatabase();
      if(createDummyUser) await handleCreateDummyUser();

      console.log("MongoDB: Successfully set up database");
    } catch(error) {
      console.error("MongoDB: Failed to set up database", error);
    }
  };

  // overwrite the default options
  await init({ createDatabase: true, wipeDatabase: false, createDummyUser: false, ...options });
};

const setupDatabases = async (options, helpers) => {
  try {
    console.log("Database: Setting up databases");

    await setupMongoose(options, helpers);

    console.log("Databases: Successfully set up databases");
  } catch(error) {
    console.error("Databases: Failed to set up databases");
  }
};

export default setupDatabases;