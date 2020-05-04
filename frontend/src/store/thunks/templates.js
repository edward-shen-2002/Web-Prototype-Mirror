import templateController from '@controllers/templates'

import {
  requestTemplates,
  failTemplatesRequest,
  receiveTemplates,
  createTemplate,
  deleteTemplate,
  updateTemplate
} from '@actions/TemplateStore'

import { createBlankReactState } from "@tools/excel";

export const getTemplateRequest = (_id) => (dispatch) => {
  dispatch(requestTemplates())

  return templateController.fetchTemplate(_id)
    .then((template) => dispatch(receiveTemplates({ Values: [ template ] })))
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