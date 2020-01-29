import { UPDATE_SELECTED_ROWS, RESET_SELECTED_ROWS } from "@actionCreators";

export const updateSelectedRows = (selectedRows) => ({ type: UPDATE_SELECTED_ROWS, selectedRows });
export const resetSelectedRows = () => ({ type: RESET_SELECTED_ROWS });