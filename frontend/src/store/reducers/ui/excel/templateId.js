import { createReducer } from "store/tools/setup";

const UPDATE_TEMPLATE_ID = (_state, { _id }) => _id;

const RESET_TEMPLATE_ID = () => "";

const templateIdReducer = createReducer("", { UPDATE_TEMPLATE_ID, RESET_TEMPLATE_ID });

export default templateIdReducer;