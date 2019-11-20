import { UPDATE_ROW_HEIGHTS, RESET_ROW_HEIGHTS } from "actionCreators";

export const updateRowHeights = (rowHeights) => ({ type: UPDATE_ROW_HEIGHTS, rowHeights });

export const resetRowHeights = () => ({ type: RESET_ROW_HEIGHTS });