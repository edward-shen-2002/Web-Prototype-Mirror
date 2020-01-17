import { createReducer } from "@store/tools/setup";

const OPEN_TEMPLATE_ID_MAPPING_DIALOG = () => true;

const CLOSE_TEMPLATE_ID_MAPPING_DIALOG = () => false;

const isTemplateIdMappingDialogOpenReducer = createReducer(false, { OPEN_TEMPLATE_ID_MAPPING_DIALOG, CLOSE_TEMPLATE_ID_MAPPING_DIALOG });

export default isTemplateIdMappingDialogOpenReducer;