import { Action } from 'redux'

export const createReducer = (initialState: any, handlers: object) => (
  (state = initialState, action: Action) => {
    if(handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  }
);