import {
  FAIL_COA_GROUPS_REQUEST,
  RECEIVE_COA_GROUPS,
  REQUEST_COA_GROUPS,
  CREATE_COA_GROUP,
  DELETE_COA_GROUP,
  UPDATE_COA_GROUP,
} from './actionTypes'

export const failCOAGroupsRequest = (error) => ({
  type: FAIL_COA_GROUPS_REQUEST,
  error,
})
export const receiveCOAGroups = (response) => ({
  type: RECEIVE_COA_GROUPS,
  response,
})
export const requestCOAGroups = () => ({ type: REQUEST_COA_GROUPS })
export const createCOAGroup = (response) => ({
  type: CREATE_COA_GROUP,
  response,
})
export const deleteCOAGroup = (response) => ({
  type: DELETE_COA_GROUP,
  response,
})
export const updateCOAGroup = (response) => ({
  type: UPDATE_COA_GROUP,
  response,
})
