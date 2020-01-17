import {
  UPDATE_TEMPLATE_ID,
  RESET_TEMPLATE_ID
} from "@actionCreators";

export const updateTemplateId = (_id) => ({ type: UPDATE_TEMPLATE_ID, _id });

export const resetTemplateId = () => ({ type: RESET_TEMPLATE_ID });