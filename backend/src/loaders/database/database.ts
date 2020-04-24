import mongoose from 'mongoose'

import { IOptions, IDatabase } from './interface'

import IRepositories from '../../repositories/interface'
import { DATABASE_KEY } from '../../configs/database'

const logTag = '[DB][MongoDB]: '

const defaultOptions: IOptions = {
  shouldWipeDatabase: false,
  shouldCreateDummyData: false,
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// TODO: DO NOT LOAD REPOSITORIES HERE - Singleton database connection
// TODO: Change to promise
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default class Database implements IDatabase {
  public repositories: IRepositories

  public async initialize(customOptions = defaultOptions) {
    console.log(logTag, 'Initializing...')

    return this.initializeMongoose()
      .then(() => console.log(logTag, 'Initialize successful'))
      .catch((error) => {
        throw `${logTag} Failed to initialize \n${error}`
      })
  }

  public async applyOptions({ shouldCreateDummyData, shouldWipeDatabase }) {}

  public loadRepositories() {}

  public async wipeDatabase() {
    console.warn(logTag, 'Wiping database...')
    return mongoose.connection
      .dropDatabase()
      .then(() => console.warn(logTag, 'Wiped database'))
      .catch((error) => {
        throw `${logTag}Failed to wipe database\n${error}`
      })
  }

  /**
   * Connects to and creates the configuration for the database
   */
  public async initializeMongoose() {
    console.log(logTag, 'Connecting...')
    return mongoose
      .connect(DATABASE_KEY, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => console.log(logTag, 'Connection successful'))
      .catch((error) => {
        throw `${logTag}Failed to connect to database\n${error}`
      })
  }

  public async createDummyData(models) {
    console.log(logTag, 'Creating dummy data...')

    // .then(() => {
    console.log(logTag, 'Created dummy data')
    // })
    // .catch(() => {
    //   throw `${logTag}Failed to create dummy data`
    // })
  }
}
