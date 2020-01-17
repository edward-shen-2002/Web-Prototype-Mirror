import { createReducer } from "@store/tools/setup";

const UPDATE_BUNDLE_ID = (_state, { _id }) => _id;

const RESET_BUNDLE_ID = () => "";

const bundleIdReducer = createReducer("", { UPDATE_BUNDLE_ID, RESET_BUNDLE_ID });

export default bundleIdReducer;