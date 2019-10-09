import { UPDATE_ACCOUNT, CLEAR_ACCOUNT } from "actionCreators";

export const updateAccount = (account) => ({ type: UPDATE_ACCOUNT, account });

export const clearAccount = () => ({ type: CLEAR_ACCOUNT });