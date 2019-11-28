import { createReducer } from "store/tools/setup";
import { isAxiosTokenSet } from "tools/rest";
import { isTokenSaved } from "tools/storage";

// Check local storage if token is available
// Token will persist if user did not log out
const defaultShouldReconnect = isTokenSaved() && !isAxiosTokenSet();

const SET_SHOULD_RECONNECT_ON = () => true;
const SET_SHOULD_RECONNECT_OFF = () => false;

const shouldReconnectReducer = createReducer(defaultShouldReconnect, { 
  SET_SHOULD_RECONNECT_ON, 
  SET_SHOULD_RECONNECT_OFF 
});

export default shouldReconnectReducer;