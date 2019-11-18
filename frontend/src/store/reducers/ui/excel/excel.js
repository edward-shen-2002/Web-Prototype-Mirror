import { combineReducers } from "redux";

import selectionArea from "./selectionArea";

import isSelectionMode from "./isSelectionMode";

import isEditMode from "./isEditMode";

const excelReducer = combineReducers({ selectionArea, isSelectionMode, isEditMode });

export default excelReducer;