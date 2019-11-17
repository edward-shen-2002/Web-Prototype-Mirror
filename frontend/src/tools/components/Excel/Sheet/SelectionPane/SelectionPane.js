import React, { Component, Fragment, useRef, useEffect } from "react";

import { connect } from "react-redux";

import "./SelectionPane.scss";

const STYLE_SELECTION_BORDER_COLOR = "rgba(75, 135, 255, 0.95)";
const STYLE_SELECTION_BORDER_WIDTH = "1px";

class SelectionPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectionAreaStyle: { display: "none", left: 0, top: 0, width: 0, height: 0 },
      activeCellStyle: { display: "none", left: 0, top: 0, width: 0, height: 0 },
      isEditMode: false
    };
  }

  updateSelectionAreaStyle(selectionAreaStyle) {
    this.setState({ selectionAreaStyle });
  }
  
  updateActiveCellStyle(activeCellStyle, isEditMode) {    
    this.setState({ activeCellStyle, isEditMode });
  }

  resetSelectionArea() {
    if(this.state.selectionAreaStyle.width || this.state.selectionAreaStyle.height) {
      this.setState({ selectionAreaStyle: { display: "none", top: 0, left: 0, width: 0, height: 0 } });
    }
  }

  resetActiveCell() {
    if(this.state.activeCellStyle.width || this.state.activeCellStyle.height) {
      this.setState({ isEditMode: false, activeCellStyle: { display: "none", top: 0, left: 0, width: 0, height: 0 } });
    }
  }
  
  render() {
    const { activeCellStyle, selectionAreaStyle, isEditMode } = this.state;

    return (
      <Fragment>
        <div className="selectionArea" style={selectionAreaStyle}/>
        {
          isEditMode 
            ? <input className="activeCell activeCell--editMode" type="text" style={activeCellStyle} autoFocus/>
            : <div className="activeCell activeCell--normalMode" style={activeCellStyle}/>
        }
      </Fragment>
    );
  }
}

const mapSelectionAreaStateToProps = ({ ui: { excel: { selectionArea, isSelectionMode, isEditMode } } }) => ({ selectionArea, isSelectionMode, isEditMode });

export let TopLeftSelectionPane = ({
  sheetRef, 
  selectionRef, 
  selectionArea,
  sheetContainerRef,
  isSelectionMode,
  isEditMode,
  freezeRowCount,
  freezeColumnCount
}) => {
  useEffect(() => {
    const { x1, y1, x2, y2 } = selectionArea;

    const { current } = sheetRef;

    if(current) {
      if(((y2 <= freezeRowCount || y1 <= freezeRowCount) && (x2 <= freezeColumnCount || x1 <= freezeColumnCount)) && current){
        let borderStyle = isSelectionMode ? "dashed" : "solid";
        let selectionAreaWidth;
        let selectionAreaHeight;
        let selectionAreaStyle;
        let left;
        let top;
        let customSelectionStyle = {
          borderTopWidth: STYLE_SELECTION_BORDER_WIDTH,
          borderTopColor: STYLE_SELECTION_BORDER_COLOR,
          borderTopStyle: borderStyle,
          borderLeftWidth: STYLE_SELECTION_BORDER_WIDTH,
          borderLeftColor: STYLE_SELECTION_BORDER_COLOR,
          borderLeftStyle: borderStyle,
        };
  
        const { top: topStart, left: leftStart, width: widthStart, height: heightStart } = current._getItemStyle(y1, x1);
        const { top: topEnd, left: leftEnd, width: widthEnd, height: heightEnd } = current._getItemStyle(y2, x2);
  
        if(x1 <= x2) {
          selectionAreaWidth = leftEnd + widthEnd - leftStart;
          left = leftStart;
        } else {
          selectionAreaWidth = leftStart + widthStart - leftEnd;
          left = leftEnd;
        }
  
        if(y1 <= y2) {
          selectionAreaHeight = topEnd + heightEnd - topStart;
          top = topStart;
        } else {
          selectionAreaHeight = topStart + heightStart - topEnd;
          top = topEnd;
        }
  
        if(y1 > freezeRowCount || y2 > freezeRowCount) {
          const minRowHeight = y1 < y2 ? topStart : topEnd;

          const { top: topFrozenEnd, height: heightFrozenEnd } = current._getItemStyle(freezeRowCount, freezeColumnCount);
  
          selectionAreaHeight = topFrozenEnd + heightFrozenEnd - minRowHeight;
        } else {
          customSelectionStyle.borderBottomColor = STYLE_SELECTION_BORDER_COLOR;
          customSelectionStyle.borderBottomWidth = STYLE_SELECTION_BORDER_WIDTH;
          customSelectionStyle.borderBottomStyle = borderStyle;
        }
      
        if(x1 > freezeColumnCount || x2 > freezeColumnCount) {
          const minColumnWidth = x1 < x2 ? leftStart : leftEnd;

          const { left: leftFrozenEnd, width: widthFrozenEnd } = current._getItemStyle(freezeRowCount, freezeColumnCount);
  
          selectionAreaWidth = leftFrozenEnd + widthFrozenEnd - minColumnWidth;
        } else {
          customSelectionStyle.borderRightColor = STYLE_SELECTION_BORDER_COLOR;
          customSelectionStyle.borderRightWidth = STYLE_SELECTION_BORDER_WIDTH;
          customSelectionStyle.borderRightStyle = borderStyle;
        }

        selectionAreaStyle = { 
          left, 
          top, 
          width: selectionAreaWidth, 
          height: selectionAreaHeight, 
          display: null, 
          ...customSelectionStyle 
        };
  
        const activeCellStyle = { 
          top: topStart, 
          left: leftStart, 
          width: widthStart, 
          height: heightStart, 
          display: null 
        };
  
        selectionRef.current.updateSelectionAreaStyle(selectionAreaStyle);

        if(y1 <= freezeRowCount && x1 <= freezeColumnCount) {
          selectionRef.current.updateActiveCellStyle(activeCellStyle);
        } else {
          selectionRef.current.resetActiveCell();
        }
      } else {
        selectionRef.current.resetSelectionArea();

        if(x1 > freezeColumnCount || y1 > freezeRowCount) selectionRef.current.resetActiveCell();
      }
    }
  });
  
  return (
    <SelectionPane
      ref={selectionRef}
      isSelectionMode={isSelectionMode}
      isEditMode={isEditMode}
      sheetContainerRef={sheetContainerRef}
    />
  );
};

TopLeftSelectionPane = connect(mapSelectionAreaStateToProps)(TopLeftSelectionPane);

export let TopRightSelectionPane = ({
  sheetRef, 
  selectionRef, 
  sheetContainerRef,
  selectionArea,
  isSelectionMode,
  freezeColumnCount, 
  freezeRowCount,
  isEditMode
}) => {
  useEffect(() => {
    const { x1, y1, x2, y2 } = selectionArea;

    const { current } = sheetRef;

    if(current) {
      if((y2 <= freezeRowCount || y1 <= freezeRowCount) && current){
        let borderStyle = isSelectionMode ? "dashed" : "solid";
        let selectionAreaWidth;
        let selectionAreaHeight;
        let selectionAreaStyle;
        let left;
        let top;
        let customSelectionStyle = {
          borderRightWidth: STYLE_SELECTION_BORDER_WIDTH,
          borderRightColor: STYLE_SELECTION_BORDER_COLOR,
          borderRightStyle: borderStyle,
          borderTopWidth: STYLE_SELECTION_BORDER_WIDTH,
          borderTopColor: STYLE_SELECTION_BORDER_COLOR,
          borderTopStyle: borderStyle,
        };
  
        const { top: topStart, left: leftStart, width: widthStart, height: heightStart } = current._getItemStyle(y1, x1);
        const { top: topEnd, left: leftEnd, width: widthEnd, height: heightEnd } = current._getItemStyle(y2, x2);
  
        if(x1 <= x2) {
          selectionAreaWidth = leftEnd + widthEnd - leftStart;
          left = leftStart;
        } else {
          selectionAreaWidth = leftStart + widthStart - leftEnd;
          left = leftEnd;
        }
  
        if(y1 <= y2) {
          selectionAreaHeight = topEnd + heightEnd - topStart;
          top = topStart;
        } else {
          selectionAreaHeight = topStart + heightStart - topEnd;
          top = topEnd;
        }
  
        if(freezeRowCount) {
          if(y1 > freezeRowCount || y2 > freezeRowCount) {
            const minRowHeight = y1 < y2 ? topStart : topEnd;
  
            const { top: topFrozenEnd, height: heightFrozenEnd } = current._getItemStyle(freezeRowCount, freezeColumnCount);
    
            selectionAreaHeight = topFrozenEnd + heightFrozenEnd - minRowHeight;
          } else {
            customSelectionStyle.borderBottomColor = STYLE_SELECTION_BORDER_COLOR;
            customSelectionStyle.borderBottomWidth = STYLE_SELECTION_BORDER_WIDTH;
            customSelectionStyle.borderBottomStyle = borderStyle;
          }
        }

        if(x1 > freezeColumnCount && x2 > freezeColumnCount) {
          customSelectionStyle.borderLeftColor = STYLE_SELECTION_BORDER_COLOR;
          customSelectionStyle.borderLeftWidth = STYLE_SELECTION_BORDER_WIDTH;
          customSelectionStyle.borderLeftStyle = borderStyle;
        }

        selectionAreaStyle = { 
          left, 
          top, 
          width: selectionAreaWidth, 
          height: selectionAreaHeight, 
          display: null, 
          ...customSelectionStyle 
        };
  
        const activeCellStyle = { 
          top: topStart, 
          left: leftStart, 
          width: widthStart, 
          height: heightStart, 
          display: null 
        };
  
        selectionRef.current.updateSelectionAreaStyle(selectionAreaStyle);

        if(y1 <= freezeRowCount && x1 > freezeColumnCount) {
          selectionRef.current.updateActiveCellStyle(activeCellStyle);
        } else {
          selectionRef.current.resetActiveCell();
        }
      } else {
        selectionRef.current.resetSelectionArea();

        if(x1 <= freezeColumnCount || y1 > freezeRowCount) selectionRef.current.resetActiveCell();
      }
    }
  });
  
  return (
    <SelectionPane
      ref={selectionRef}
      isSelectionMode={isSelectionMode}
      isEditMode={isEditMode}
      sheetContainerRef={sheetContainerRef}
    />
  );
};

TopRightSelectionPane = connect(mapSelectionAreaStateToProps)(TopRightSelectionPane);

export let BottomLeftSelectionPane = ({
  sheetRef, 
  selectionRef, 
  selectionArea,
  isSelectionMode,
  freezeColumnCount, 
  freezeRowCount,
  isEditMode
}) => {
  useEffect(() => {
    const { x1, y1, x2, y2 } = selectionArea;

    const { current } = sheetRef;

    if(current) {
      if((x2 <= freezeColumnCount || x1 <= freezeColumnCount) && current){
        let borderStyle = isSelectionMode ? "dashed" : "solid";
        let selectionAreaWidth;
        let selectionAreaHeight;
        let selectionAreaStyle;
        let left;
        let top;
        let customSelectionStyle = {
          borderBottomWidth: STYLE_SELECTION_BORDER_WIDTH,
          borderBottomColor: STYLE_SELECTION_BORDER_COLOR,
          borderBottomStyle: borderStyle,
          borderLeftWidth: STYLE_SELECTION_BORDER_WIDTH,
          borderLeftColor: STYLE_SELECTION_BORDER_COLOR,
          borderLeftStyle: borderStyle,
        };
  
        let { top: topStart, left: leftStart, width: widthStart, height: heightStart } = current._getItemStyle(y1, x1);
        const { top: topEnd, left: leftEnd, width: widthEnd, height: heightEnd } = current._getItemStyle(y2, x2);
  
        if(x1 <= x2) {
          selectionAreaWidth = leftEnd + widthEnd - leftStart;
          left = leftStart;
        } else {
          selectionAreaWidth = leftStart + widthStart - leftEnd;
          left = leftEnd;
        }
  
        if(y1 <= y2) {
          selectionAreaHeight = topEnd + heightEnd - topStart;
          top = topStart;
        } else {
          selectionAreaHeight = topStart + heightStart - topEnd;
          top = topEnd;
        }
  
        if(freezeColumnCount) {
          if(x1 > freezeColumnCount || x2 > freezeColumnCount) {
            const minColumnWidth = x1 < x2 ? leftStart : leftEnd;
  
            const { left: leftFrozenEnd, width: widthFrozenEnd } = current._getItemStyle(freezeRowCount, freezeColumnCount);
    
            selectionAreaWidth = leftFrozenEnd + widthFrozenEnd - minColumnWidth;
          } else {
            customSelectionStyle.borderRightColor = STYLE_SELECTION_BORDER_COLOR;
            customSelectionStyle.borderRightWidth = STYLE_SELECTION_BORDER_WIDTH;
            customSelectionStyle.borderRightStyle = borderStyle;
          }
        } 
        
        if(freezeRowCount) {
          const { top: topFrozenEnd, height: heightFrozenEnd } = current._getItemStyle(freezeRowCount, freezeColumnCount);

          top = top - topFrozenEnd - heightFrozenEnd;
          topStart = topStart - topFrozenEnd - heightFrozenEnd;
        }

        if(y1 > freezeRowCount && y2 > freezeRowCount) {
          customSelectionStyle.borderTopColor = STYLE_SELECTION_BORDER_COLOR;
          customSelectionStyle.borderTopWidth = STYLE_SELECTION_BORDER_WIDTH;
          customSelectionStyle.borderTopStyle = borderStyle;
        }

        selectionAreaStyle = { 
          left, 
          top, 
          width: selectionAreaWidth, 
          height: selectionAreaHeight, 
          display: null, 
          ...customSelectionStyle 
        };
  
        const activeCellStyle = { 
          top: topStart, 
          left: leftStart, 
          width: widthStart, 
          height: heightStart, 
          display: null 
        };
  
        selectionRef.current.updateSelectionAreaStyle(selectionAreaStyle);

        if(y1 > freezeRowCount && x1 <= freezeColumnCount) {
          selectionRef.current.updateActiveCellStyle(activeCellStyle);
        } else {
          selectionRef.current.resetActiveCell();
        }
      } else {
        selectionRef.current.resetSelectionArea();

        if(x1 > freezeColumnCount || y1 <= freezeRowCount) selectionRef.current.resetActiveCell();
      }
    }
  });

  return (
    <SelectionPane
      ref={selectionRef}
      isSelectionMode={isSelectionMode}
      isEditMode={isEditMode}
    />
  );
};

BottomLeftSelectionPane = connect(mapSelectionAreaStateToProps)(BottomLeftSelectionPane);

export let BottomRightSelectionPane = ({ 
  sheetRef, 
  selectionRef, 
  sheetContainerRef,
  selectionArea,
  isSelectionMode,
  freezeColumnCount,
  freezeRowCount,
  isEditMode
}) => {
  useEffect(() => {
    const { x1, y1, x2, y2 } = selectionArea;

    if((x1 <= freezeColumnCount && x2 <= freezeColumnCount) || (y1 <= freezeRowCount && y2 <= freezeColumnCount)) {
      selectionRef.current.resetActiveCell();
      selectionRef.current.resetSelectionArea();
    }

    const { current } = sheetRef;

    let selectionAreaWidth;
    let selectionAreaHeight;
    let left;
    let top;

    const { top: topStart, left: leftStart, width: widthStart, height: heightStart } = current._getItemStyle(y1, x1);
    const { top: topEnd, left: leftEnd, width: widthEnd, height: heightEnd } = current._getItemStyle(y2, x2);

    if(x1 <= x2) {
      selectionAreaWidth = leftEnd + widthEnd - leftStart;
      left = leftStart;
    } else {
      selectionAreaWidth = leftStart + widthStart - leftEnd;
      left = leftEnd;
    }

    if(y1 <= y2) {
      selectionAreaHeight = topEnd + heightEnd - topStart;
      top = topStart;
    } else {
      selectionAreaHeight = topStart + heightStart - topEnd;
      top = topEnd;
    }

    const selectionAreaStyle = { 
      left: left, 
      top: top, 
      width: selectionAreaWidth, 
      height: selectionAreaHeight, 
      borderWidth: STYLE_SELECTION_BORDER_WIDTH,
      borderColor: STYLE_SELECTION_BORDER_COLOR,
      borderStyle: isSelectionMode ? "dashed" : "solid",
      display: null,
      zIndex: 100
    };

    const activeCellStyle = { 
      top: topStart, 
      left: leftStart, 
      width: widthStart, 
      height: heightStart, 
      display: null 
    };

    selectionRef.current.updateSelectionAreaStyle(selectionAreaStyle);

    selectionRef.current.updateActiveCellStyle(activeCellStyle, x1 > freezeColumnCount && y1 > freezeRowCount ? isEditMode : false);
  });

  return (
    <SelectionPane
      ref={selectionRef}
      isSelectionMode={isSelectionMode}
      isEditMode={isEditMode}
      sheetContainerRef={sheetContainerRef}
    />
  );
};

BottomRightSelectionPane = connect(mapSelectionAreaStateToProps)(BottomRightSelectionPane);
