import { combineReducers } from "redux";

import selectionArea from "./selectionArea";

import activeCell from "./activeCell";

import isSelectionMode from "./isSelectionMode";

const excelReducer = combineReducers({ selectionArea, activeCell, isSelectionMode });

export default excelReducer;