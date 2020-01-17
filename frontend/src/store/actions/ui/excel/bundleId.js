import {
  UPDATE_BUNDLE_ID,
  RESET_BUNDLE_ID
} from "@actionCreators";

export const updateBundleId = (_id) => ({ type: UPDATE_BUNDLE_ID, _id });

export const resetBundleId = () => ({ type: RESET_BUNDLE_ID });