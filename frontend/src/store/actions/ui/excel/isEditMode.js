import { SET_EDIT_MODE_ON, SET_EDIT_MODE_OFF } from "actionCreators";

export const enableEditMode = () => ({ type: SET_EDIT_MODE_ON });

export const disableEditMode = () => ({ type: SET_EDIT_MODE_OFF });