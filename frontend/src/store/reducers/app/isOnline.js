import { createReducer } from "store/tools/setup";
import { isTokenSaved } from "tools/storage"; 

const defaultIsOnline = isTokenSaved();

const setOffline = () => false;

const setOnline = () => true;

const isOnlineReducer = createReducer(defaultIsOnline, { SET_OFFLINE: setOffline, SET_ONLINE: setOnline });

export default isOnlineReducer;