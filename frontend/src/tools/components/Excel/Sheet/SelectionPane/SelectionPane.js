import React, { Component, Fragment, useRef, useEffect } from "react";

import { connect } from "react-redux";

import "./SelectionPane.scss";

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
    let selectionAreaStyle = { ...this.state.selectionAreaStyle };
    
    if(isSelectionMode) {
      selectionAreaStyle.borderStyle = "dashed";
    } else {
      selectionAreaStyle.borderStyle = "solid";
    }

    let activeCellStyle = { ...this.state.activeCellStyle };

    return (
      <Fragment>
        <div className="selectionArea" style={selectionAreaStyle}/>
        <div className="activeCell" style={activeCellStyle}/>
      </Fragment>
    );
  }
}

const mapSelectionAreaStateToProps = ({ ui: { excel: { selectionArea, isSelectionMode } } }) => ({ selectionArea, isSelectionMode });

let SelectionPaneListener = ({ 
  sheetRef, 
  selectionRef, 
  selectionArea,
  isSelectionMode
}) => {
  const { x1, y1, x2, y2 } = selectionArea;

  useEffect(() => {
    const { current } = sheetRef;
    if(current){
      let selectionAreaWidth;
      let selectionAreaHeight;
      let selectionAreaStyle;
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

      selectionAreaStyle = { left, top, width: selectionAreaWidth, height: selectionAreaHeight, display: null, zIndex: 99999 };

      const activeCellStyle = { top: topStart, left: leftStart, width: widthStart, height: heightStart, display: null, zIndex: 99999 };

      if(selectionRef) {
        selectionRef.current.update(selectionAreaStyle);
        selectionRef.current.updateActiveCell(activeCellStyle);
      }
    }
  });
  
  return (
    <SelectionPane
      ref={selectionRef}
      isSelectionMode={isSelectionMode}
    />
  );
};

SelectionPaneListener = connect(mapSelectionAreaStateToProps)(SelectionPaneListener);

export default SelectionPaneListener;