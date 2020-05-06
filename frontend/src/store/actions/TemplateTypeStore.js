import {
  FAIL_TEMPLATE_TYPES_REQUEST,
  RECEIVE_TEMPLATE_TYPES,
  REQUEST_TEMPLATE_TYPES,
  CREATE_TEMPLATE_TYPE,
  DELETE_TEMPLATE_TYPE,
  UPDATE_TEMPLATE_TYPE
} from "./actionCreators"

export const failTemplateTypesRequest = (error) => ({ type: FAIL_TEMPLATE_TYPES_REQUEST, error })
export const receiveTemplateTypes = (response) => ({ type: RECEIVE_TEMPLATE_TYPES, response })
export const requestTemplateTypes = () => ({ type: REQUEST_TEMPLATE_TYPES })
export const createTemplateType = (response) => ({ type: CREATE_TEMPLATE_TYPE, response })
export const deleteTemplateType = (response) => ({ type: DELETE_TEMPLATE_TYPE, response })
export const updateTemplateType = (response) => ({ type: UPDATE_TEMPLATE_TYPE, response })