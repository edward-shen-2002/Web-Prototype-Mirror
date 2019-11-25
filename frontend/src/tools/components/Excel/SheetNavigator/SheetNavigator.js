import React from "react";

import { connect } from "react-redux";

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

const SheetNameDraggable = ({ provided, sheetName, activeSheetName }) => {
  const isActive = activeSheetName === sheetName;

  const handleClick = () => {
    // if(!isActive) handleChangeSheet(index);
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

const SheetNamesDraggables = ({ sheetNames, activeSheetName }) => sheetNames.map((sheetName, index) => (
  <Draggable key={`sheet-name-${sheetName}`} draggableId={sheetName} index={index}>
    {(provided) => (
      <SheetNameDraggable provided={provided} sheetName={sheetName} activeSheetName={activeSheetName} index={index}/>
    )}
  </Draggable>
));

const SheetNamesDroppable = ({ sheetNames, activeSheetName }) => (
  <Droppable droppableId="droppable" direction="horizontal">
    {(provided) => (
      <div ref={provided.innerRef} className="sheetNavigator__droppable" {...provided.droppableProps}>
        <SheetNamesDraggables sheetNames={sheetNames} activeSheetName={activeSheetName}/>
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

const SheetSelectionContext = ({ activeSheetName, sheetNames, handleDragEnd }) => (
  <DragDropContext onDragEnd={handleDragEnd}>
    <SheetNamesDroppable sheetNames={sheetNames} activeSheetName={activeSheetName}/>
  </DragDropContext>
);

const mapStateToProps = ({
  ui: {
    excel: {
      sheetNames,
      activeSheetName
    }
  }
}) => ({
  sheetNames,
  activeSheetName
});

let SheetNavigator = ({ activeSheetName, sheetNames }) => {
  // ! Think carefully about this one...
  const handleAddSheet = () => {
    // const newSheetName = generateNewSheetName(sheetNames);

    // workbook.addSheet(newSheetName);
    // handleUpdateSheetNames([ ...sheetNames, newSheetName ]);
  };

  const handleDragEnd = (result) => {
    if(!result.destination) return;

    // const newSheetNames = DnDReorder(sheetNames, result.source.index, result.destination.index);

    // const movedSheet = workbook.sheet(result.source.index);

    // const sheetName = movedSheet.name();

    // workbook.moveSheet(sheetName, result.destination.index);
  };

  return (
    <div className="sheetNavigator">
      <AddButton handleClick={handleAddSheet}/>
      <SheetSelectionContext sheetNames={sheetNames} activeSheetName={activeSheetName} handleDragEnd={handleDragEnd}/>
    </div>
  );
};

SheetNavigator = connect(mapStateToProps)(SheetNavigator);

export default SheetNavigator;