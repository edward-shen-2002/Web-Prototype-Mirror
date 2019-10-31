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
const setupMongoose = async (options, { UserModel, DataGroupModel, OrganizationModel, RegistrationModel, RegisterVerificationModel }) => {
  const handleCreateDatabase = async () => {
    console.log("MongoDB: Creating collections in database");
    try {

      await UserModel.createCollection();
      await DataGroupModel.createCollection();
      await OrganizationModel.createCollection();
      await RegistrationModel.createCollection();
      await RegisterVerificationModel.createCollection();

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
      console.log("MongoDB: Creating dummy admin");

      const fullAdminControlRoles = {
        TEMPLATE_MANAGER: {
        scope: ROLE_LEVEL_ADMIN,
        LHINs: [],
        organizations: []
        }, 
        DATA_MANAGER: {
          scope: ROLE_LEVEL_ADMIN,
          LHINs: [],
          organizations: []
        }, 
        PACKAGE_MANAGER: {
          scope: ROLE_LEVEL_ADMIN,
          LHINs: [],
          organizations: []
        }, 
        USER_MANAGER: {
          scope: ROLE_LEVEL_ADMIN,
          LHINs: [],
          organizations: []
        }, 
        ORGANIZATION_MANAGER: {
          scope: ROLE_LEVEL_ADMIN,
          LHINs: [],
          organizations: []
        },
        LHIN_MANAGER: {
          scope: ROLE_LEVEL_ADMIN,
          LHINs: [],
          organizations: []
        },
        SECTOR_MANAGER: {
          scope: ROLE_LEVEL_ADMIN,
          LHINs: [],
          organizations: []
        },
        SYSTEM_MANAGER: {
          scope: ROLE_LEVEL_ADMIN,
          LHINs: [],
          organizations: []
        }
      };
    
      const sampleUser = { username: "sampleuser", email: "sampleuser@hotmail.com", password: "password123@", roles: fullAdminControlRoles };

      await UserModel.register({ ...sampleUser, password: undefined }, sampleUser.password);

      console.log("MongoDB: Successfully created dummy admin");
    } catch(error) {
      console.error("MondoDB: Failed to create dummy admin", error);
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