import mongoose from '../../models/ColumnName/node_modules/mongoose'

import { DATABASE_KEY } from '../../config/database'

import { IOptions, IDatabase } from './interface'

import IRepositories from '../../repositories/interface'

const logTag = '[DB][MongoDB]: '

const defaultOptions: IOptions = { 
  shouldWipeDatabase      : false, 
  shouldCreateDummyData   : false
}

export default class Database implements IDatabase {
  public repositories: IRepositories

  public async initialize (customOptions = defaultOptions) {
    try {
      console.log(logTag, 'Initializing...')
      await this.initializeMongoose()

      this.loadRepositories()

      await this.applyOptions({ ...defaultOptions, ...customOptions })

      console.log(logTag, 'Initialize successful')
    } catch(error) {
      throw `${logTag} Failed to initialize`
    }
  }

  public async applyOptions({ shouldCreateDummyData, shouldWipeDatabase }) {
    try {
      console.log(logTag, 'Applying options...')
  
      if(shouldWipeDatabase) await this.wipeDatabase()
      if(shouldCreateDummyData) await this.createDummyData(this.repositories)
  
      console.log(logTag, 'Applied options')
    } catch(error) {
      throw `${logTag}Failed to apply options`
    }
  }

  public loadRepositories() {

  }

  public async wipeDatabase() {
    try {
      console.warn(logTag, 'Wiping database...')

      await mongoose.connection.dropDatabase()

      console.warn(logTag, 'Wiped database')
    } catch(error) {
      throw `${logTag}Failed to wipe database`
    }
  }

  /**
   * Connects to and creates the configuration for the database
   */
  public async initializeMongoose() {
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


  public async createDummyData(models) {
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
}
