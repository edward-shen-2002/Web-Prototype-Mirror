import IDataRepositories from '../../repositories/interface'

/**
 * Methods to prepopulate databases with sample data for testing purposes
 */

/**
 * Populates the database with test data
 *
 * @param models The data models of the database
 */
type CreateDummyData = (repositories: IDataRepositories) => Promise<void>
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
  shouldWipeDatabase: boolean
  shouldCreateDummyData: boolean
}
