import * as mongoose from 'mongoose'

import { DATABASE_KEY } from '../../config/database'

import UserModel from '../../models/User'

import OrganizationModel from '../../models/Organization'
import OrganizationGroupModel from '../../models/OrganizationGroup'

import ProgramModel from '../../models/Program'
import SubmissionModel from '../../models/Submission'
import TemplateModel from '../../models/Template'

import CategoryGroupHierarchyModel from '../../models/CategoryGroupHierarchy'
import CategoryGroupModel from '../../models/CategoryGroup'
import ReportPeriodModel from '../../models/ReportPeriod'
import YearModel from '../../models/Year'

import MasterValueModel from '../../models/MasterValue'

import { IOptions, WipeDatabase, CreateDummyData, ApplyOptions } from './interface'

import IModels from '../../models/interface'

const logTag = '[DB][MongoDB]: '

const defaultOptions: IOptions = { 
  shouldWipeDatabase      : false, 
  shouldCreateDummyData   : false
}

/**
 * Connects to and creates the configuration for the database
 */
const initializeMongoose = async () => {
  try {
    console.log(logTag, 'Connecting...')
    mongoose.set('autoCreate', true)

    await mongoose.connect(
      DATABASE_KEY, 
      { 
        useNewUrlParser     : true, 
        useCreateIndex      : true, 
        useFindAndModify    : false, 
        useUnifiedTopology  : true 
      }
    )

    console.log(logTag, 'Connection successful')
  } catch(error) {
    throw `${logTag}Failed to connect to database\n${error}`
  }
}

/**
 * Populates the database with test data
 * 
 * @param models The data models of the database
 */
const createDummyData: CreateDummyData = async (models) => {
  try {
    console.log(logTag, 'Creating dummy data...')


    ///////////////////
    // ! TODO
    ///////////////////

    console.log(logTag, 'Created dummy data')
  } catch(error) {
    throw `${logTag}Failed to create dummy data`
  }
}

/**
 * Clears the content of all collections in the database
 */
const wipeDatabase: WipeDatabase = async () => {
  try {
    console.warn(logTag, 'Wiping database...')

    await mongoose.connection.dropDatabase()

    console.warn(logTag, 'Wiped database')
  } catch(error) {
    throw `${logTag}Failed to wipe database`
  }
}

const applyOptions: ApplyOptions = async (
  {
    shouldCreateDummyData,
    shouldWipeDatabase
  },
  models
) => {
  try {
    console.log(logTag, 'Applying options...')

    if(shouldWipeDatabase) await wipeDatabase()
    if(shouldCreateDummyData) await createDummyData(models)

    console.log(logTag, 'Applied options')
  } catch(error) {
    throw `${logTag}Failed to apply options`
  }
}

/**
 * Closure MongoDB setup.
 * 
 * @param customOptions Database options to trigger additional features
 */
export default (
  () => {
    const models: IModels = {
      UserModel,
      
      OrganizationModel,
      OrganizationGroupModel,

      ProgramModel,
      SubmissionModel,
      TemplateModel,

      CategoryGroupHierarchyModel,
      CategoryGroupModel,
      ReportPeriodModel,
      YearModel,

      MasterValueModel
    }

    const initialize = async (customOptions: IOptions = defaultOptions) => {
      try {
        console.log(logTag, 'Initializing...')
        await initializeMongoose()

        await applyOptions(
          { ...defaultOptions, ...customOptions },
          models
        )

        console.log(logTag, 'Initialize successful')
      } catch(error) {
        throw `${logTag} Failed to initialize`
      }
    }

    return () => ({
      models,
      initialize
    })
  }
)()
