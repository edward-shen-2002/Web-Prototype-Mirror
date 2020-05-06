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

// ? Cause page redirection on error
export const getTemplateRequest = (_id) => (dispatch) => {
  dispatch(requestTemplates())

  templateController.fetchTemplate(_id)
    .then((template) => {
      batch(
        () => {
          dispatch(setExcelData(convertStateToReactState(template.templateData)))
          dispatch(receiveTemplates({ Values: [ template ] }))
        }
      )
    })
    .catch((error) => {
      dispatch(failTemplatesRequest(error))
    })
}

export const getTemplatesRequest = (query, resolve, reject) => (dispatch) => {
  dispatch(requestTemplates())

  templateController.fetchTemplates(query)
    .then((templates) => {
      dispatch(receiveTemplates({ Values: templates }))
      resolve()
    })
    .catch((error) => {
      dispatch(failTemplatesRequest(error))
      reject()
    })
}

export const createTemplateRequest = (template, resolve, reject) => (dispatch) => {
  dispatch(requestTemplates())
  
  templateController.createTemplate(
      {
        ...template,
        templateData: createBlankReactState()
      }
    )
    .then((template) => {
      dispatch(createTemplate({ Value: template }))
      resolve()
    })
    .catch((error) => {
      dispatch(failTemplatesRequest(error))
      reject()
    })
}

export const deleteTemplateRequest = (_id, resolve, reject) => (dispatch) => {
  dispatch(requestTemplates())

  templateController.deleteTemplate(_id)
    .then(() => {
      dispatch(deleteTemplate({ Value: { _id } }))
      resolve()
    })
    .catch((error) => {
      dispatch(failTemplatesRequest(error))
      reject()
    })
}

export const updateTemplateRequest = (template, resolve, reject) => (dispatch) => {
  dispatch(requestTemplates())

  templateController.updateTemplate(template)
    .then(() => {
      dispatch(updateTemplate({ Value: template }))
      resolve()
    })
    .catch((error) => {
      dispatch(failTemplatesRequest(error))
      reject()
    })
}