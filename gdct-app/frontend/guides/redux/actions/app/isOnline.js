import { SET_ONLINE, SET_OFFLINE } from '../actionTypes'

// Will be used to notify the type of action shouldbe performed (type) and the data associated
// const action = (data1, data2, ...) => ({ type: ACTION_TYPE, data, ... })
export const setOnline = () => ({ type: SET_ONLINE })
export const setOffline = () => ({ type: SET_OFFLINE })
