import { createReducer } from "store/tools/setup";

const defaultAccount = { username: "", email: "", firstName: "", lastName: "", active: true, validated: false, phoneNumber: "", createDate: "" };

const updateAccount = (_state, { account }) => ({ ...defaultAccount, ...account });

const clearAccount = () => ({ ...defaultAccount });

const accountReducer = createReducer(defaultAccount, { UPDATE_ACCOUNT: updateAccount, CLEAR_ACCOUNT: clearAccount });

export default accountReducer;