import { createReducer } from "store/tools/setup";

const PUBLISH_TEMPLATE = () => true;

const UNPUBLISH_TEMPLATE = () => false;

const TOGGLE_TEMPLATE_PUBLISH = (publish) => !publish;

const UPDATE_PUBLISH_TEMPLATE = (_state, { published }) => published;

const isTemplatePublished = createReducer(false, { 
  PUBLISH_TEMPLATE, 
  UNPUBLISH_TEMPLATE, 
  TOGGLE_TEMPLATE_PUBLISH ,
  UPDATE_PUBLISH_TEMPLATE
});

export default isTemplatePublished;