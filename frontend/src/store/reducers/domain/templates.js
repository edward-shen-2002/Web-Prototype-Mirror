import { createReducer } from '../../tools/setup' 

const defaultTemplates = []

const CREATE_TEMPLATE = (state, { template }) => {
  return [...state, template]
}

const UPDATE_TEMPLATES = (_state, { templates }) => templates

const DELETE_TEMPLATE = (state, { _id }) =>
  state.filter((template) => template._id === _id)

const templatesReducer = createReducer(defaultTemplates, {
  CREATE_TEMPLATE,
  UPDATE_TEMPLATES,
  DELETE_TEMPLATE,
})

export default templatesReducer
