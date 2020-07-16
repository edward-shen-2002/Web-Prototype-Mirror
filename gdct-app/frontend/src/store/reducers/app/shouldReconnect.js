import { createReducer } from '../../tools/setup'
import { isAxiosTokenSet } from '../../../tools/rest'
import { isTokenSaved } from '../../../tools/storage'

// Check local storage if token is available
// Token will persist if user did not log out
const defaultShouldReconnect = isTokenSaved() && !isAxiosTokenSet()

const ENABLE_RECONNECTION = () => true
const DISABLE_RECONNECTION = () => false

const shouldReconnectReducer = createReducer(defaultShouldReconnect, {
  ENABLE_RECONNECTION,
  DISABLE_RECONNECTION,
})

export default shouldReconnectReducer
