import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        actionSanitizer: (action) => (
          action.type === "EXCEL_SET_EXCEL_DATA" 
            ? { 
                ...action, 
                excelData: {
                  ...action.excelData,
                  inactiveSheets: "<<LONG_BLOB>>" 
                }
              }
            : action
        ),
        stateSanitizer: (state) =>({
          ...state,
          ui: {
            ...state.ui,
            excel: {
              ...state.ui.excel,
              inactiveSheets: "<<LONG_BLOB>>"
            }
          }
        })
      }) 
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

export default store;
