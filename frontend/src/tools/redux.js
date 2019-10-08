import { setOnline, setOffline } from "store/actions/app/isOnline";

export const loadUserState = (dispatch) => {
  dispatch(setOnline());
};

export const resetUserState = (dispatch) => {
  dispatch(setOffline());
};