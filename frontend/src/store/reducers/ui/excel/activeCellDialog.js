import { createReducer } from "@store/tools/setup";

const UPDATE_ACTIVE_CELL_DIALOG = (_state, { dialogType }) => dialogType;

const RESET_ACTIVE_CELL_DIALOG = () => null;

const activeCellDialogReducer = createReducer(null, { UPDATE_ACTIVE_CELL_DIALOG, RESET_ACTIVE_CELL_DIALOG });

export default activeCellDialogReducer;