import { setOnline, setOffline } from "store/actions/app/isOnline";
import { updateAccount, clearAccount } from "store/actions/domain/account";

import { deleteAxiosToken, setAxiosToken } from "tools/rest";
import { deleteToken, saveToken } from "tools/storage";

export const loadUserState = (dispatch, { user, token }) => {
  if(token) {
    saveToken(token);
    setAxiosToken(token);
  }

  dispatch(setOnline());
  dispatch(updateAccount(user));
};

export const resetUserState = (dispatch) => {
  deleteAxiosToken();
  deleteToken();

  dispatch(setOffline());

  dispatch(clearAccount())
};