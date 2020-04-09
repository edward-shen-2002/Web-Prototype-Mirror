import IModels from '../../models/interface'

/**
 * Methods to prepopulate databases with sample data for testing purposes
 */

/**
 * Populates the database with test data
 * 
 * @param models The data models of the database
 */
export type CreateDummyData = (models: IModels) => Promise<void>
type WipeDatabase = () => Promise<void>
type ApplyOptions = (options: IOptions) => Promise<void>

/**
 * MongoDB setup.
 */
export interface IDatabase {
  wipeDatabase: WipeDatabase
  createDummyData: CreateDummyData
  applyOptions: ApplyOptions
}

export interface IOptions {
  shouldWipeDatabase     : boolean
  shouldCreateDummyData  : boolean
}
