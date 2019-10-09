import { setOnline, setOffline } from "store/actions/app/isOnline";
import { updateAccount } from "store/actions/domain/account";

export const loadUserState = (dispatch, user) => {
  dispatch(setOnline());
  dispatch(updateAccount(user));
};

export const resetUserState = (dispatch) => {
  dispatch(setOffline());
};