import columnNameController from '../../controllers/organization'
import ColumnNamesStore from '../ColumnNameStore/store'
import {
  getRequestFactory,
  createRequestFactory,
  deleteRequestFactory,
  updateRequestFactory,
} from './common/REST'

export const getColumnNamesRequest = getRequestFactory(
  ColumnNamesStore,
  columnNameController
)
export const createColumnNameRequest = createRequestFactory(
  ColumnNamesStore,
  columnNameController
)
export const deleteColumnNameRequest = deleteRequestFactory(
  ColumnNamesStore,
  columnNameController
)
export const updateColumnNameRequest = updateRequestFactory(
  ColumnNamesStore,
  columnNameController
)