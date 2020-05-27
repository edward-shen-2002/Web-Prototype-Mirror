import {
  FAIL_TEMPLATE_PACKAGES_REQUEST,
  RECEIVE_TEMPLATE_PACKAGES,
  REQUEST_TEMPLATE_PACKAGES,
  CREATE_TEMPLATE_PACKAGE,
  DELETE_TEMPLATE_PACKAGE,
  UPDATE_TEMPLATE_PACKAGE,
} from './actionTypes'

export const failTemplatePackagesRequest = (error) => ({
  type: FAIL_TEMPLATE_PACKAGES_REQUEST,
  error,
})
export const receiveTemplatePackages = (response) => ({
  type: RECEIVE_TEMPLATE_PACKAGES,
  response,
})
export const requestTemplatePackages = () => ({
  type: REQUEST_TEMPLATE_PACKAGES,
})
export const createTemplatePackage = (response) => ({
  type: CREATE_TEMPLATE_PACKAGE,
  response,
})
export const deleteTemplatePackage = (response) => ({
  type: DELETE_TEMPLATE_PACKAGE,
  response,
})
export const updateTemplatePackage = (response) => ({
  type: UPDATE_TEMPLATE_PACKAGE,
  response,
})
export const resetTemplatePackages = () => ({
  type: RESET_TEMPLATE_PACKAGES,
  response,
})
