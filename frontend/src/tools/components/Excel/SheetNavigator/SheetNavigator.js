import React from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import { generateNewSheetName } from "tools/excel";
import { DnDReorder } from "tools/misc";

import "./SheetNavigator.scss";

const AddButton = ({ handleClick }) => (
  <Button onClick={handleClick}>
    <AddIcon fontSize="small"/>
  </Button>
);

const SheetNameDraggable = ({ provided, sheetName, activeSheetIndex, index, handleChangeSheet }) => {
  const isActive = activeSheetIndex === index;

  const handleClick = () => {
    if(!isActive) handleChangeSheet(index);
  };

  return (
    <div
      ref={provided.innerRef}
      className={`sheetNavigator__draggable ${isActive ? "sheetNavigator__draggable--active" : "sheetNavigator__draggable--inactive"}`}
      style={provided.draggableProps.style}
      onClick={handleClick}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {sheetName}
    </div>
  );
};

const SheetNamesDraggables = ({ sheetNames, activeSheetIndex, handleChangeSheet }) => sheetNames.map((sheetName, index) => (
  <Draggable key={`sheet-name-${sheetName}`} draggableId={sheetName} index={index}>
    {(provided) => (
      <SheetNameDraggable provided={provided} sheetName={sheetName} activeSheetIndex={activeSheetIndex} index={index} handleChangeSheet={handleChangeSheet}/>
    )}
  </Draggable>
));

const SheetNamesDroppable = ({ sheetNames, activeSheetIndex, handleChangeSheet }) => (
  <Droppable droppableId="droppable" direction="horizontal">
    {(provided) => (
      <div ref={provided.innerRef} className="sheetNavigator__droppable" {...provided.droppableProps}>
        <SheetNamesDraggables sheetNames={sheetNames} activeSheetIndex={activeSheetIndex} handleChangeSheet={handleChangeSheet}/>
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

const SheetSelectionContext = ({ activeSheetIndex, sheetNames, handleDragEnd, handleChangeSheet }) => (
  <DragDropContext onDragEnd={handleDragEnd}>
    <SheetNamesDroppable sheetNames={sheetNames} activeSheetIndex={activeSheetIndex} handleChangeSheet={handleChangeSheet}/>
  </DragDropContext>
);

const SheetNavigator = ({ workbook, activeSheetIndex, sheetNames, handleChangeSheet, handleUpdateSheetNames }) => {
  // ! Think carefully about this one...
  const handleAddSheet = () => {
    const newSheetName = generateNewSheetName(sheetNames);

    workbook.addSheet(newSheetName);
    handleUpdateSheetNames([ ...sheetNames, newSheetName ]);
  };

  const handleDragEnd = (result) => {
    if(!result.destination) return;

    const newSheetNames = DnDReorder(sheetNames, result.source.index, result.destination.index);

    const movedSheet = workbook.sheet(result.source.index);

    const sheetName = movedSheet.name();

    workbook.moveSheet(sheetName, result.destination.index);
    
    handleUpdateSheetNames(newSheetNames);
    handleChangeSheet
  };

  return (
    <div className="sheetNavigator">
      <AddButton handleClick={handleAddSheet}/>
      <SheetSelectionContext sheetNames={sheetNames} activeSheetIndex={activeSheetIndex} handleDragEnd={handleDragEnd} handleChangeSheet={handleChangeSheet}/>
    </div>
  );
};

export default SheetNavigator;