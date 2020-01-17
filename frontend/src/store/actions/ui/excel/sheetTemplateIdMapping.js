import { UPDATE_SHEET_TEMPLATE_ID_MAPPING, RESET_SHEET_TEMPLATE_ID_MAPPING } from "@actionCreators";

export const updateSheetTemplateIdMapping = (sheetTemplateIdMapping) => ({ type: UPDATE_SHEET_TEMPLATE_ID_MAPPING, sheetTemplateIdMapping });
export const resetSheetTemplateIdMapping = () => ({ type: RESET_SHEET_TEMPLATE_ID_MAPPING });
