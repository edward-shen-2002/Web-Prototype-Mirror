import { createReducer } from "store/tools/setup";

const defaultAccount = { username: "", email: "", firstName: "", lastName: "", active: true, phoneNumber: "", creationDate: "", roles: [] };

const updateAccount = (state, { account }) => ({ ...state, ...account });

const clearAccount = () => ({ ...defaultAccount });

const accountReducer = createReducer(defaultAccount, { UPDATE_ACCOUNT: updateAccount, CLEAR_ACCOUNT: clearAccount });

export default accountReducer;