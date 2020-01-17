import { createReducer } from "@store/tools/setup";

const UPDATE_SHEET_TEMPLATE_ID_MAPPING = (state, { sheetTemplateIdMapping }) => ({ ...state, ...sheetTemplateIdMapping });
const RESET_SHEET_TEMPLATE_ID_MAPPING = () => ({});

const sheetTemplateIdMappingReducer = createReducer({}, { UPDATE_SHEET_TEMPLATE_ID_MAPPING, RESET_SHEET_TEMPLATE_ID_MAPPING });

export default sheetTemplateIdMappingReducer;
