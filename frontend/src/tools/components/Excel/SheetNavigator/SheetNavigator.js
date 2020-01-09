import React from "react";

import { connect } from "react-redux";

import { updateSheetNames } from "actions/ui/excel/sheetNames";
import { updateActiveSheetName } from "actions/ui/excel/activeSheetName";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

// import { generateNewSheetName } from "tools/excel";
import { DnDReorder } from "tools/misc";

import "./SheetNavigator.scss";

const AddButton = ({ handleClick }) => (
  <Button onClick={handleClick}>
    <AddIcon fontSize="small"/>
  </Button>
);

const SheetNameDraggable = ({ 
  sheetGridRef,
  provided, 
  sheetName, 
  activeSheetName,
  handleChangeActiveSheet
}) => {
  const isActive = activeSheetName === sheetName;

  const handleClick = () => {
    if(!isActive) {
      handleChangeActiveSheet(sheetName);
      sheetGridRef.current.resetAfterIndices({ columnIndex: 0, rowIndex: 0 });
    }
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

const SheetNamesDraggables = ({ 
  sheetGridRef,
  sheetNames, 
  activeSheetName, 
  handleChangeActiveSheet 
}) => sheetNames.map((sheetName, index) => (
  <Draggable key={`sheet-name-${sheetName}`} draggableId={sheetName} index={index}>
    {(provided) => (
      <SheetNameDraggable 
        sheetGridRef={sheetGridRef}
        provided={provided} 
        sheetName={sheetName} 
        activeSheetName={activeSheetName} 
        index={index}
        handleChangeActiveSheet={handleChangeActiveSheet}
      />
    )}
  </Draggable>
));

const SheetNamesDroppable = ({ 
  sheetGridRef,
  sheetNames, 
  activeSheetName,
  handleChangeActiveSheet
}) => (
  <Droppable droppableId="droppable" direction="horizontal">
    {(provided) => (
      <div ref={provided.innerRef} className="sheetNavigator__droppable" {...provided.droppableProps}>
        <SheetNamesDraggables 
          sheetGridRef={sheetGridRef}
          sheetNames={sheetNames} 
          activeSheetName={activeSheetName}
          handleChangeActiveSheet={handleChangeActiveSheet}
        />
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

const SheetSelectionContext = ({ 
  sheetGridRef,
  activeSheetName, 
  sheetNames, 
  handleDragEnd,
  handleChangeActiveSheet 
}) => (
  <DragDropContext onDragEnd={handleDragEnd}>
    <SheetNamesDroppable 
      sheetGridRef={sheetGridRef}
      sheetNames={sheetNames} 
      activeSheetName={activeSheetName} 
      handleChangeActiveSheet={handleChangeActiveSheet}
    />
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
  activeSheetName,
});

const mapDispatchToProps = (dispatch) => ({
  handleChangeActiveSheet: (activeSheetName) => dispatch(updateActiveSheetName(activeSheetName)),
  handleChangeSheetNames: (sheetNames) => dispatch(updateSheetNames(sheetNames)),
});

// Move this state subscription and action to EventListener
let SheetNavigator = ({ 
  sheetGridRef,
  eventListenerRef,
  activeSheetName, 
  sheetNames,

  handleChangeSheetNames
}) => {
  // ! Think carefully about this one...
  const handleAddSheet = () => {
    // const newSheetName = generateNewSheetName(sheetNames);

    // handleUpdateSheetNames([ ...sheetNames, newSheetName ]);
  };

  const handleClickSheet = (sheetName) => eventListenerRef.current.changeSheet(sheetName);

  const handleDragEnd = (result) => {
    if(!result.destination) return;

    const newSheetNames = DnDReorder(sheetNames, result.source.index, result.destination.index);

    handleChangeSheetNames(newSheetNames);
  };

  return (
    <div className="sheetNavigator">
      <AddButton handleClick={handleAddSheet}/>
      <SheetSelectionContext 
        sheetGridRef={sheetGridRef}
        sheetNames={sheetNames} 
        activeSheetName={activeSheetName} 
        handleDragEnd={handleDragEnd} 
        handleChangeActiveSheet={handleClickSheet}
      />
    </div>
  );
};

SheetNavigator = connect(mapStateToProps, mapDispatchToProps)(SheetNavigator);

export default SheetNavigator;