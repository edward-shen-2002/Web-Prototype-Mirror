import { createReducer } from "store/tools/setup";
import { isAxiosTokenSet } from "tools/rest";
import { isTokenSaved } from "tools/storage";

// Check local storage if token is available
// Token will persist if user did not log out
const defaultShouldReconnect = isTokenSaved() && !isAxiosTokenSet();

const setShouldReconnect = (_state, { shouldReconnect }) => shouldReconnect;

const shouldReconnect = createReducer(defaultShouldReconnect, { SET_SHOULDRECONNECT: setShouldReconnect });

export default shouldReconnect;