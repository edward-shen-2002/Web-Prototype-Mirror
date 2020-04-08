import IModels from '../../models/interface'

interface IDatabasesInstance {
  wipeDatabase: WipeDatabase
  createDummyData: CreateDummyData
}

export interface IOptions {
  shouldWipeDatabase?     : boolean
  shouldCreateDummyData?  : boolean
}

/**
 * Function to prepopulate databases with sample data for testing purposes
 * 
 * @template IDatabases 
 */
export type CreateDummyData = (models: IModels) => Promise<void>
export type WipeDatabase = () => Promise<void>
export type ApplyOptions = (options: IOptions, models: IModels) => Promise<void>

export type DatabasesInstance = () => IDatabasesInstance

export type DatabasesContainer = () => DatabasesInstance
