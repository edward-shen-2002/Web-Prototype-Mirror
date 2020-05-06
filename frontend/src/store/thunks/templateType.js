import { 
  requestTemplateTypes, 
  failTemplateTypesRequest, 
  receiveTemplateTypes, 
  createTemplateType, 
  deleteTemplateType, 
  updateTemplateType 
} from '../actions/TemplateTypeStore'

import templateTypeController from '../../controllers/templateType'

export const getTemplateTypesRequest = (query) => (dispatch) => {
  dispatch(requestTemplateTypes())

  templateTypeController.fetchTemplateTypes(query)
    .then((templateTypes) => dispatch(receiveTemplateTypes({ Values: templateTypes })))
    .catch((error) => dispatch(failTemplateTypesRequest(error)))
}

export const createTemplateTypeRequest = (templateType) => (dispatch) => {
  dispatch(requestTemplateTypes())
  
  templateTypeController.createTemplateType(templateType)
    .then((templateType) => dispatch(createTemplateType({ Value: templateType })))
    .catch((error) => dispatch(failTemplateTypesRequest(error)))
}

export const deleteTemplateTypeRequest = (_id) => (dispatch) => {
  dispatch(requestTemplateTypes())

  templateTypeController.deleteTemplateType(_id)
    .then(() => dispatch(deleteTemplateType({ Value: { _id } })))
    .catch((error) => dispatch(failTemplateTypesRequest(error)))
}

export const updateTemplateTypeRequest = (templateType) => (dispatch) => {
  dispatch(requestTemplateTypes())

  templateTypeController.updateTemplateType(templateType)
    .then(() => dispatch(updateTemplateType({ Value: templateType })))
    .catch((error) => dispatch(failTemplateTypesRequest(error)))
}