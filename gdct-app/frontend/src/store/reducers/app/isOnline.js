import { createReducer } from '../../tools/setup'
import { isTokenSaved } from '../../../tools/storage'

const defaultIsOnline = isTokenSaved()

const SET_OFFLINE = () => false
const SET_ONLINE = () => true

const isOnlineReducer = createReducer(defaultIsOnline, {
  SET_OFFLINE,
  SET_ONLINE,
})

export default isOnlineReducer
