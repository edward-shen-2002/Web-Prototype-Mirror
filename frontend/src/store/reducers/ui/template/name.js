import { createReducer } from "store/tools/setup";

const UPDATE_TEMPLATE_NAME = (_state, { name }) =>  name;

const RESET_TEMPLATE_NAME = () => "";

const templateNameReducer = createReducer("", { UPDATE_TEMPLATE_NAME, RESET_TEMPLATE_NAME });

export default templateNameReducer;