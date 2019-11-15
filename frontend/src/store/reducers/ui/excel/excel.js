import { combineReducers } from "redux";

import selectionArea from "./selectionArea";

import activeCell from "./activeCell";

import isSelectionMode from "./isSelectionMode";

import isEditMode from "./isEditMode";

const excelReducer = combineReducers({ selectionArea, activeCell, isSelectionMode, isEditMode });

export default excelReducer;