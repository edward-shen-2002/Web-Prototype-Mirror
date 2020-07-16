import mongoose from 'mongoose';

import { DATABASE_KEY } from '../../configs/database';

const logTag = '[DB][MongoDB]: ';

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// TODO: DO NOT LOAD REPOSITORIES HERE - Singleton database connection
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default class Database {
  connect() {
    console.log(logTag, 'Initializing...');

    this.initializeMongoose();

    console.log(logTag, 'Initialize successful');
  }

  disconnect() {
    mongoose.disconnect();
  }

  /**
   * Connects to and creates the configuration for the database
   */
  initializeMongoose() {
    console.log(logTag, 'Connecting...');

    mongoose.connect(DATABASE_KEY, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(logTag, 'Connection successful');
  }
}
