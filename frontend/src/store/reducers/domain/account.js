import { createReducer } from "@store/tools/setup";

const defaultAccount = { username: "", email: "", firstName: "", lastName: "", active: true, phoneNumber: "", creationDate: "", roles: [] };

const updateAccount = (state, { account }) => ({ ...state, ...account });

const resetAccount = () => ({ ...defaultAccount });

const accountReducer = createReducer(defaultAccount, { UPDATE_ACCOUNT: updateAccount, RESET_ACCOUNT: resetAccount });

export default accountReducer;