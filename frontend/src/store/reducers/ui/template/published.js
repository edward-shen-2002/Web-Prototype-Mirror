import { createReducer } from "store/tools/setup";

const SET_TEMPLATE_PUBLISHED = () =>  true;

const SET_TEMPLATE_UNPUBLISHED = () => false;

const isTemplatePublishedReducer = createReducer(false, { SET_TEMPLATE_PUBLISHED, SET_TEMPLATE_UNPUBLISHED });

export default isTemplatePublishedReducer;