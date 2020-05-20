// import { batch } from 'react-redux'

import {
  requestTemplatePackages,
  failTemplatePackagesRequest,
  receiveTemplatePackages,
  createTemplatePackage,
  deleteTemplatePackage,
  updateTemplatePackage
} from '../actions/TemplatePackagesStore'

import templatePackageController from '../../controllers/templatePackage';

export const getTemplatePackagesRequest = (query) => (dispatch) => {
  dispatch(requestTemplatePackages())

  templatePackageController.fetchTemplatePackages(query)
    .then((templatePackages) => {
      dispatch(receiveTemplatePackages({ Values: templatePackages }))
    })
    .catch((error) => {
      dispatch(failTemplatePackagesRequest(error))
    })
}

export const createTemplatePackageRequest = (templatePackage, resolve, reject) => (dispatch) => {
  dispatch(requestTemplatePackages())
  
  templatePackageController.createTemplatePackage(templatePackage)
    .then((templatePackage) => {
      dispatch(createTemplatePackage({ Value: templatePackage }))
      resolve()
    })
    .catch((error) => {
      dispatch(failTemplatePackagesRequest(error))
      reject()
    })
}

export const deleteTemplatePackageRequest = (_id, resolve, reject) => (dispatch) => {
  dispatch(requestTemplatePackages())

  templatePackageController.deleteTemplatePackage(_id)
    .then(() => {
      dispatch(deleteTemplatePackage({ Value: { _id } }))
      resolve()
    })
    .catch((error) => {
      dispatch(failTemplatePackagesRequest(error))
      reject()
    })
}

export const updateTemplatePackageRequest = (templatePackage, resolve, reject) => (dispatch) => {
  dispatch(requestTemplatePackages())

  templatePackageController.updateTemplatePackage(templatePackage)
    .then(() => {
      dispatch(updateTemplatePackage({ Value: templatePackage }))
      resolve()
    })
    .catch((error) => {
      dispatch(failTemplatePackagesRequest(error))
      reject()
    })
}