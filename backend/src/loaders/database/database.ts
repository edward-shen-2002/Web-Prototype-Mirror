import mongoose from 'mongoose'

import { IDatabase } from './interface'

import { DATABASE_KEY } from '../../configs/database'

const logTag = '[DB][MongoDB]: '

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// TODO: DO NOT LOAD REPOSITORIES HERE - Singleton database connection
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default class Database implements IDatabase {
  public connect() {
    console.log(logTag, 'Initializing...')

    this.initializeMongoose()

    console.log(logTag, 'Initialize successful')
  }

  public disconnect() {
    mongoose.disconnect()
  }

  /**
   * Connects to and creates the configuration for the database
   */
  public initializeMongoose() {
    console.log(logTag, 'Connecting...')

    mongoose.connect(DATABASE_KEY, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })

    console.log(logTag, 'Connection successful')
  }
}
