import {
  FAIL_TEMPLATES_REQUEST,
  RECEIVE_TEMPLATES,
  REQUEST_TEMPLATES,
  CREATE_TEMPLATE,
  DELETE_TEMPLATE,
  UPDATE_TEMPLATE
} from "./actionCreators"

export const failTemplatesRequest = (error) => ({ type: FAIL_TEMPLATES_REQUEST, error })
export const receiveTemplates = (response) => ({ type: RECEIVE_TEMPLATES, response })
export const requestTemplates = () => ({ type: REQUEST_TEMPLATES })
export const createTemplate = (response) => ({ type: CREATE_TEMPLATE, response })
export const deleteTemplate = (response) => ({ type: DELETE_TEMPLATE, response })
export const updateTemplate = (response) => ({ type: UPDATE_TEMPLATE, response })
export const resetTemplates = () => ({ type: RESET_TEMPLATES, response })
