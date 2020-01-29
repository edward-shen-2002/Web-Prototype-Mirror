import { UPDATE_SELECTED_COLUMNS, RESET_SELECTED_COLUMNS } from "@actionCreators";

export const updateSelectedColumns = (selectedColumns) => ({ type: UPDATE_SELECTED_COLUMNS, selectedColumns });
export const resetSelectedColumns = () => ({ type: RESET_SELECTED_COLUMNS });