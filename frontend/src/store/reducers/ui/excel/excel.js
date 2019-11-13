import { combineReducers } from "redux";

import selectionArea from "./selectionArea";

import activeCell from "./activeCell";

const excelReducer = combineReducers({ selectionArea, activeCell });

export default excelReducer;