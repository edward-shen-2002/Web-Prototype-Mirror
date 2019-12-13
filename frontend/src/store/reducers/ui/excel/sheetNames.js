import { createReducer } from "store/tools/setup";

import { DEFAULT_EXCEL_SHEET_NAMES } from "constants/excel";

const UPDATE_SHEET_NAMES = (_state, { sheetNames }) => [ ...sheetNames ];

const RESET_SHEET_NAMES = () => DEFAULT_EXCEL_SHEET_NAMES;

const sheetNamesReducer = createReducer(DEFAULT_EXCEL_SHEET_NAMES, { UPDATE_SHEET_NAMES, RESET_SHEET_NAMES });

export default sheetNamesReducer;