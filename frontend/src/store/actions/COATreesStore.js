import {
  FAIL_COA_TREES_REQUEST,
  RECEIVE_COA_TREES,
  REQUEST_COA_TREES,
  CREATE_COA_TREE,
  DELETE_COA_TREE,
  UPDATE_COA_TREE,
} from './actionTypes'

export const failCOATreesRequest = (error) => ({
  type: FAIL_COA_TREES_REQUEST,
  error,
})
export const receiveCOATrees = (response) => ({
  type: RECEIVE_COA_TREES,
  response,
})
export const requestCOATrees = () => ({ type: REQUEST_COA_TREES })
export const createCOATree = (response) => ({ type: CREATE_COA_TREE, response })
export const deleteCOATree = (response) => ({ type: DELETE_COA_TREE, response })
export const updateCOATree = (response) => ({ type: UPDATE_COA_TREE, response })
export const resetCOATrees = () => ({ type: RESET_COA_TREES, response })
