import mongoose from 'mongoose'

import { IOptions, IDatabase } from './interface'

import IRepositories from '../../repositories/interface'
import { DATABASE_KEY } from '../../configs/database'
import COAModel from '../../models/COA'

const logTag = '[DB][MongoDB]: '

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// TODO: DO NOT LOAD REPOSITORIES HERE - Singleton database connection
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default class Database implements IDatabase {
  public repositories: IRepositories

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
    }).then(
      (db) => {
        console.log('connected')
        // console.log(db)
        COAModel.find({}).then((COAs) => console.log('COAS', COAs))
        console.log(db.modelNames())
      }
    )

    console.log(logTag, 'Connection successful')
  }
}
