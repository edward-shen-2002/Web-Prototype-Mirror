import { ENABLE_ACTIVE_CELL_INPUT_AUTO_FOCUS, DISABLE_ACTIVE_CELL_INPUT_AUTO_FOCUS } from "@actionCreators";

export const enableActiveCellInputAutoFocus = () => ({ type: ENABLE_ACTIVE_CELL_INPUT_AUTO_FOCUS });

export const disableActiveCellInputAutoFocus = () => ({ type: DISABLE_ACTIVE_CELL_INPUT_AUTO_FOCUS });