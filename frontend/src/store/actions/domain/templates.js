import {
  UPDATE_TEMPLATES,
  CREATE_TEMPLATE,
  DELETE_TEMPLATE,
} from '@actionTypes'

export const createTemplate = (template) => ({
  type: CREATE_TEMPLATE,
  template,
})

export const updateTemplates = (templates) => ({
  type: UPDATE_TEMPLATES,
  templates,
})

export const deleteTemplate = (_id) => ({ type: DELETE_TEMPLATE, _id })
