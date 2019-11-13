import { UPDATE_ACTIVECELL, RESET_ACTIVECELL } from "actionCreators";

export const updateActiveCell = (activeCell) => ({ type: UPDATE_ACTIVECELL, activeCell });

export const resetActiveCell = () => ({ type: RESET_ACTIVECELL });