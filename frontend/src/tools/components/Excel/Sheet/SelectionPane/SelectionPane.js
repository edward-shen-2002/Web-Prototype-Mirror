import React, { Component, Fragment, useRef, useEffect } from "react";

import { connect } from "react-redux";

import "./SelectionPane.scss";

// ! Consider using HOC - Selection(specificSelection)

const defaultSelectionAreaStyle = {
  zIndex: 100000,
  position: "absolute",
  borderWidth: "1px",
  borderColor: "rgba(75, 135, 255, 0.95)",
  background: "rgba(3, 169, 244, 0.05)",
  pointerEvents: "none",
  display: "none"
};

const defaultActiveCellStyle = {
  zIndex: 100000,
  position: "absolute",
  border: "2px solid rgba(75, 135, 255, 0.95)",
  pointerEvents: "none",
  display: "none"
};

class SelectionPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectionAreaStyle: { left: 0, top: 0, width: 0, height: 0 },
      activeCellStyle: { left: 0, top: 0, width: 0, height: 0 }
    };
  }

  update(selectionAreaStyle) {
    this.setState({ selectionAreaStyle });
  }
  
  updateActiveCell(activeCellStyle) {
    this.setState({ activeCellStyle });
  }

  reset() {
    if(this.state.selectionAreaStyle.width || this.state.selectionAreaStyle.height) {
      this.setState({ 
        selectionAreaStyle: { top: 0, width: 0, height: 0 },
        activeCellStyle: { top: 0, width: 0, height: 0 }
      });
    }
  }

  render() {
    const { isSelectionMode } = this.props;
    let selectionAreaStyle = { ...defaultSelectionAreaStyle, ...this.state.selectionAreaStyle };
    
    if(isSelectionMode) {
      selectionAreaStyle.borderStyle = "dashed";
    } else {
      selectionAreaStyle.borderStyle = "solid";
    }

    let activeCellStyle = { ...defaultActiveCellStyle, ...this.state.activeCellStyle };

    return (
      <Fragment>
        <div style={selectionAreaStyle}/>
        <div style={activeCellStyle}/>
      </Fragment>
    );
  }
}

const mapSelectionAreaStateToProps = ({ ui: { excel: { selectionArea, isSelectionMode } } }) => ({ selectionArea, isSelectionMode });

export let TopLeftSelectionPane = ({ 
  sheetRef, 
  selectionRef, 
  selectionArea,
  isSelectionMode, 
  tableFreezeRowCount, 
  tableFreezeColumnCount
}) => {
  const { x1, y1, x2, y2 } = selectionArea;
  useEffect(() => {
    const { current } = sheetRef;
    const isCorrectPane = x1 >= x2 && y1 >= y2;

    if(current && isCorrectPane){
      const { top: topStart, left: leftStart, width: widthStart, height: heightStart } = current._getItemStyle(y1, x1);
      const { top: topEnd, left: leftEnd } = current._getItemStyle(y2, x2);

      const selectionAreaWidth = leftStart + widthStart - leftEnd;
      const selectionAreaHeight = topStart + heightStart - topEnd;
      const selectionAreaStyle = { left: leftEnd, top: topEnd, width: selectionAreaWidth, height: selectionAreaHeight, display: null, zIndex: 100000 };

      const activeCellStyle = { top: topStart, left: leftStart, width: widthStart, height: heightStart, display: null, zIndex: 100000 };

      if(selectionRef) {
        selectionRef.current.update(selectionAreaStyle);
        selectionRef.current.updateActiveCell(activeCellStyle);
      }
    } else {
      selectionRef.current.reset();
    }
  });

  return (
    <SelectionPane
      ref={selectionRef}
      isSelectionMode={isSelectionMode}
    />
  );
};

TopLeftSelectionPane = connect(mapSelectionAreaStateToProps)(TopLeftSelectionPane);

export let TopRightSelectionPane = ({ 
  sheetRef, 
  selectionRef, 
  selectionArea,
  isSelectionMode, 
  tableFreezeRowCount, 
  tableFreezeColumnCount
}) => {
  const { x1, y1, x2, y2 } = selectionArea;

  useEffect(() => {
    const isCorrectPane = x1 < x2 && y1 > y2;

    if(isCorrectPane) {
      const { current } = sheetRef;
      if(current){
        const { top: topStart, left: leftStart, width: widthStart, height: heightStart } = current._getItemStyle(y1, x1);
        const { top: topEnd, left: leftEnd, width: widthEnd } = current._getItemStyle(y2, x2);

        const selectionAreaWidth = leftEnd + widthEnd - leftStart;
        const selectionAreaHeight = topStart + heightStart - topEnd;
        const selectionAreaStyle = { left: leftStart, top: topEnd, width: selectionAreaWidth, height: selectionAreaHeight, display: null, zIndex: 100000 };

        const activeCellStyle = { top: topStart, left: leftStart, width: widthStart, height: heightStart, display: null, zIndex: 100000 };

        if(selectionRef) {
          selectionRef.current.update(selectionAreaStyle);
          selectionRef.current.updateActiveCell(activeCellStyle);
        }
      }
    } else {
      selectionRef.current.reset();
    }
  });
  
  return (
    <SelectionPane
      ref={selectionRef}
      isSelectionMode={isSelectionMode}
    />
  );
};

TopRightSelectionPane = connect(mapSelectionAreaStateToProps)(TopRightSelectionPane);

export let BottomLeftSelectionPane = ({ 
  sheetRef, 
  selectionRef, 
  selectionArea,
  isSelectionMode, 
  tableFreezeRowCount, 
  tableFreezeColumnCount
}) => {
  const { x1, y1, x2, y2 } = selectionArea;

  useEffect(() => {
    const isCorrectPane = x1 > x2 && y1 < y2;

    if(isCorrectPane) {
      const { current } = sheetRef;
      if(current){
        const { top: topStart, left: leftStart, width: widthStart, height: heightStart } = current._getItemStyle(y1, x1);
        const { top: topEnd, left: leftEnd } = current._getItemStyle(y2, x2);

        const { top: topFrozen } = current._getItemStyle(tableFreezeRowCount, tableFreezeColumnCount);

        const selectionAreaWidth = leftStart + widthStart - leftEnd;
        const selectionAreaHeight = topEnd - topStart;
        const topOffset = topStart - topFrozen;
        const selectionAreaStyle = { left: leftEnd, top: topOffset, width: selectionAreaWidth, height: selectionAreaHeight, display: null, zIndex: 100000 };

        const activeCellStyle = { top: topOffset, left: leftStart, width: widthStart, height: heightStart, display: null, zIndex: 100000 };

        if(selectionRef) {
          selectionRef.current.update(selectionAreaStyle);
          selectionRef.current.updateActiveCell(activeCellStyle);
        }
      }
    } else {
      selectionRef.current.reset();
    }
  });
  
  return (
    <SelectionPane
      ref={selectionRef}
      isSelectionMode={isSelectionMode}
    />
  );
};

BottomLeftSelectionPane = connect(mapSelectionAreaStateToProps)(BottomLeftSelectionPane);

export let BottomRightSelectionPane = ({ 
  sheetRef, 
  selectionRef, 
  selectionArea,
  isSelectionMode
}) => {
  const { x1, y1, x2, y2 } = selectionArea;

  useEffect(() => {
    const isCorrectPane = x1 <= x2 && y1 <= y2;

    if(isCorrectPane) {
      const { current } = sheetRef;
      if(current){
        const { top: topStart, left: leftStart, width: widthStart, height: heightStart } = current._getItemStyle(y1, x1);
        const { top: topEnd, left: leftEnd, width: widthEnd, height: heightEnd } = current._getItemStyle(y2, x2);

        const selectionAreaWidth = leftEnd + widthEnd - leftStart;
        const selectionAreaHeight = topEnd + heightEnd - topStart;
        const selectionAreaStyle = { left: leftStart, top: topStart, width: selectionAreaWidth, height: selectionAreaHeight, display: null, zIndex: 99999 };

        const activeCellStyle = { top: topStart, left: leftStart, width: widthStart, height: heightStart, display: null, zIndex: 99999 };

        if(selectionRef) {
          selectionRef.current.update(selectionAreaStyle);
          selectionRef.current.updateActiveCell(activeCellStyle);
        }
      }
    } else {
      selectionRef.current.reset();
    } 
  });
  
  return (
    <SelectionPane
      ref={selectionRef}
      isSelectionMode={isSelectionMode}
    />
  );
};

BottomRightSelectionPane = connect(mapSelectionAreaStateToProps)(BottomRightSelectionPane);
