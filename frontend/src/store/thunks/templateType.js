import { 
  requestTemplateTypes, 
  failTemplateTypesRequest, 
  receiveTemplateTypes, 
  createTemplateType, 
  deleteTemplateType, 
  updateTemplateType 
} from '../actions/TemplateTypeStore'

import templateTypeController from '../../controllers/templateType'

export const getTemplateTypesRequest = (query, resolve, reject) => (dispatch) => {
  dispatch(requestTemplateTypes())

  templateTypeController.fetchTemplateTypes(query)
    .then((templateTypes) => {
      dispatch(receiveTemplateTypes({ Values: templateTypes }))
      resolve()
    })
    .catch((error) => {
      dispatch(failTemplateTypesRequest(error))
      reject()
    })
}

export const createTemplateTypeRequest = (templateType, resolve, reject) => (dispatch) => {
  dispatch(requestTemplateTypes())
  
  templateTypeController.createTemplateType(templateType)
    .then((templateType) => {
      dispatch(createTemplateType({ Value: templateType }))
      resolve()
    })
    .catch((error) => {
      dispatch(failTemplateTypesRequest(error))
      reject()
    })
}

export const deleteTemplateTypeRequest = (_id, resolve, reject) => (dispatch) => {
  dispatch(requestTemplateTypes())

  templateTypeController.deleteTemplateType(_id)
    .then(() => {
      dispatch(deleteTemplateType({ Value: { _id } }))
      resolve()
    })
    .catch((error) => {
      dispatch(failTemplateTypesRequest(error))
      reject()
    })
}

export const updateTemplateTypeRequest = (templateType, resolve, reject) => (dispatch) => {
  dispatch(requestTemplateTypes())

  templateTypeController.updateTemplateType(templateType)
    .then(() => {
      dispatch(updateTemplateType({ Value: templateType }))
      resolve()
    })
    .catch((error) => {
      dispatch(failTemplateTypesRequest(error))
      reject()
    })
}