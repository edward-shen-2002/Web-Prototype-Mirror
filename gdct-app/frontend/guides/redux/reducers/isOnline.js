// Helper function to construct reducer
import { createReducer } from '../tools';

const initalState = false;

// ACTION = (state, actionData) => stateValue;
const SET_ONLINE = () => true;
const SET_OFFLINE = () => true;

// reducer = createReducer(intiialState, actions)
const isOnline = createReducer(initalState, {
  SET_ONLINE,
  SET_OFFLINE,
});

export default isOnline;
