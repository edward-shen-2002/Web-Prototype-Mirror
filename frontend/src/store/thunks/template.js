import { batch } from 'react-redux'

import {
  requestTemplates,
  failTemplatesRequest,
  receiveTemplates,
  createTemplate,
  deleteTemplate,
  updateTemplate
} from '../actions/TemplateStore'

import { 
  setExcelData,
  resetExcelData
} from "../actions/ui/excel/commands";

import templateController from '../../controllers/template';
import { createBlankReactState, convertStateToReactState } from '../../tools/excel';

export const getTemplateRequest = (_id) => (dispatch) => {
  dispatch(requestTemplates())

  return templateController.fetchTemplate(_id)
    .then((template) => {
      batch(
        () => {
          dispatch(setExcelData(convertStateToReactState(template.templateData)))
          dispatch(receiveTemplates({ Values: [ template ] }))
        }
      )
    })
    .catch((error) => dispatch(failTemplatesRequest(error)))
}

export const getTemplatesRequest = (query) => (dispatch) => {
  dispatch(requestTemplates())

  return templateController.fetchTemplates(query)
    .then((templates) => dispatch(receiveTemplates({ Values: templates })))
    .catch((error) => dispatch(failTemplatesRequest(error)))
}

export const createTemplateRequest = (template) => (dispatch) => {
  dispatch(requestTemplates())
  
  return templateController.createTemplate(
      {
        ...template,
        templateData: createBlankReactState()
      }
    )
    .then((template) => dispatch(createTemplate({ Value: template })))
    .catch((error) => dispatch(failTemplatesRequest(error)))
}

export const deleteTemplateRequest = (_id) => (dispatch) => {
  dispatch(requestTemplates())

  return templateController.deleteTemplate(_id)
    .then(() => dispatch(deleteTemplate({ Value: { _id } })))
    .catch((error) => dispatch(failTemplatesRequest(error)))
}

export const updateTemplateRequest = (template) => (dispatch) => {
  dispatch(requestTemplates())

  return templateController.updateTemplate(template)
    .then(() => dispatch(updateTemplate({ Value: template })))
    .catch((error) => dispatch(failTemplatesRequest(error)))
}