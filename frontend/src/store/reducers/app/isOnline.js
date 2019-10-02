import { createReducer } from "store/tools/setup";

const defaultIsOnline = false;

const setOffline = () => false;

const setOnline = () => true;

const isOnlineReducer = createReducer(defaultIsOnline, {
  SET_OFFLINE: setOffline,
  SET_ONLINE: setOnline
});

export default isOnlineReducer;