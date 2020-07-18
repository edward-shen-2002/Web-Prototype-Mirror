import { UPDATE_ACCOUNT, RESET_ACCOUNT } from '../actionTypes';

export const updateAccount = account => ({ type: UPDATE_ACCOUNT, account });

export const resetAccount = () => ({ type: RESET_ACCOUNT });
