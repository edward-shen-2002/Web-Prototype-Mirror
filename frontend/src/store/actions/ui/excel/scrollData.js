import { UPDATE_SCROLL_DATA, RESET_SCROLL_DATA } from "actionCreators";

export const updateScrollData = (scrollData) =>  ({ type: UPDATE_SCROLL_DATA, scrollData });
export const resetScrollData = () => ({ type: RESET_SCROLL_DATA });
