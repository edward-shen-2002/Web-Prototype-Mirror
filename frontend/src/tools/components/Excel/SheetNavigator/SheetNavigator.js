import React from "react";

import { connect } from "react-redux";

import { updateSheetNames } from "actions/ui/excel/sheetNames";
import { updateActiveSheetName } from "actions/ui/excel/activeSheetName";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import InputBase from "@material-ui/core/InputBase";

import { DnDReorder } from "tools/misc";

import "./SheetNavigator.scss";
import { useState } from "react";
import { useEffect } from "react";

const AddButton = ({ handleClick }) => (
  <Button onClick={handleClick}>
    <AddIcon fontSize="small"/>
  </Button>
);

const SheetNameEdit = ({ 
  sheetName,
  setIsEditMode,
  handleChangeSheetName
}) => {
  const handleBlur = () => {
    setIsEditMode(false);
  }

  const handleKeyDown = ({ key, target }) => {
    
    if(key === "Enter") {
      // Save value
      const { value } = target;
      handleChangeSheetName(sheetName, value);
      target.blur();
    } else if(key === "Escape") {
      // Don't save value
      target.blur();
    }
  };

  return (
    <InputBase
      style={{ minWidth: "fit-content" }}
      defaultValue={sheetName}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  );
};

const SheetNameNormal = ({ 
  isActive,
  sheetName, 
  setIsEditMode 
}) => {
  const handleMouseDown = () => {
    if(!isActive) setIsEditMode(false);
  }
  const handleDoubleClick = () => setIsEditMode(true);
  
  return (
    <div
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
    >
      {sheetName}
    </div>
  );
};

const SheetNameDraggable = ({ 
  sheetGridRef,
  isEditMode,
  setIsEditMode,
  provided, 
  sheetName, 
  activeSheetName,
  handleChangeActiveSheet,
  handleChangeSheetName
}) => {
  const isActive = activeSheetName === sheetName;

  const handleClick = () => {
    if(!isActive) {
      handleChangeActiveSheet(sheetName);
      sheetGridRef.current.resetAfterIndices({ columnIndex: 0, rowIndex: 0 });
      setIsEditMode(false);
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
      {
        isActive && isEditMode 
          ? 
            <SheetNameEdit
              sheetName={sheetName}
              setIsEditMode={setIsEditMode}
              handleChangeSheetName={handleChangeSheetName}
            />
          : 
            <SheetNameNormal
              isActive={isActive}
              sheetName={sheetName}
              setIsEditMode={setIsEditMode}
            />
        }
    </div>
  );
};

const SheetNamesDraggables = ({ 
  sheetGridRef,
  isEditMode,
  setIsEditMode,
  sheetNames, 
  activeSheetName, 
  handleChangeActiveSheet,
  handleChangeSheetName
}) => sheetNames.map((sheetName, index) => (
  <Draggable key={`sheet-name-${sheetName}`} draggableId={sheetName} index={index}>
    {(provided) => (
      <SheetNameDraggable 
        sheetGridRef={sheetGridRef}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        provided={provided} 
        sheetName={sheetName} 
        activeSheetName={activeSheetName} 
        index={index}
        handleChangeActiveSheet={handleChangeActiveSheet}
        handleChangeSheetName={handleChangeSheetName}
      />
    )}
  </Draggable>
));

const SheetNamesDroppable = ({ 
  sheetGridRef,
  isEditMode,
  setIsEditMode,
  sheetNames, 
  activeSheetName,
  handleChangeActiveSheet,
  handleChangeSheetName
}) => (
  <Droppable droppableId="droppable" direction="horizontal">
    {(provided) => (
      <div ref={provided.innerRef} className="sheetNavigator__droppable" {...provided.droppableProps}>
        <SheetNamesDraggables 
          sheetGridRef={sheetGridRef}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          sheetNames={sheetNames} 
          activeSheetName={activeSheetName}
          handleChangeActiveSheet={handleChangeActiveSheet}
          handleChangeSheetName={handleChangeSheetName}
        />
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

const SheetSelectionContext = ({ 
  sheetGridRef,
  isEditMode,
  setIsEditMode,
  activeSheetName, 
  sheetNames, 
  handleDragEnd,
  handleChangeActiveSheet,
  handleChangeSheetName
}) => (
  <DragDropContext onDragEnd={handleDragEnd}>
    <SheetNamesDroppable 
      sheetGridRef={sheetGridRef}
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      sheetNames={sheetNames} 
      activeSheetName={activeSheetName} 
      handleChangeActiveSheet={handleChangeActiveSheet}
      handleChangeSheetName={handleChangeSheetName}
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
  const [ isEditMode, setIsEditMode ] = useState(false);

  let EventListenerInstance;

  useEffect(() => {
    EventListenerInstance = eventListenerRef.current;
  });

  const handleAddSheet = () => EventListenerInstance.addSheet();

  const handleClickSheet = (sheetName) => EventListenerInstance.changeSheet(sheetName);

  const handleDragEnd = (result) => {
    if(!result.destination) return;

    const newSheetNames = DnDReorder(sheetNames, result.source.index, result.destination.index);

    handleChangeSheetNames(newSheetNames);
  };

  const handleChangeSheetName = (sheetName, newSheetName) => EventListenerInstance.changeSheetName(sheetName, newSheetName);

  return (
    <div className="sheetNavigator">
      <AddButton handleClick={handleAddSheet}/>
      <SheetSelectionContext 
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        sheetGridRef={sheetGridRef}
        sheetNames={sheetNames} 
        activeSheetName={activeSheetName} 
        handleDragEnd={handleDragEnd} 
        handleChangeActiveSheet={handleClickSheet}
        handleChangeSheetName={handleChangeSheetName}
      />
    </div>
  );
};

SheetNavigator = connect(mapStateToProps, mapDispatchToProps)(SheetNavigator);

export default SheetNavigator;