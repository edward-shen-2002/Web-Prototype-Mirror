import { ENABLE_RECONNECTION, DISABLE_RECONNECTION } from "actionCreators";

export const enableReconnection = () => ({ type: ENABLE_RECONNECTION });
export const disableReconnection = () => ({ type: DISABLE_RECONNECTION });