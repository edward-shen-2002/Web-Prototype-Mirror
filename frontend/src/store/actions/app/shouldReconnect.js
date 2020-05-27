import { ENABLE_RECONNECTION, DISABLE_RECONNECTION } from '@actionTypes'

export const enableReconnection = () => ({ type: ENABLE_RECONNECTION })
export const disableReconnection = () => ({ type: DISABLE_RECONNECTION })
