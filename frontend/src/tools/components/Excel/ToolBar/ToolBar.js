import React from "react";

import { useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatStrikeThroguhIcon from "@material-ui/icons/StrikethroughS";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import FormatColorTextIcon from "@material-ui/icons/FormatColorText";

import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";

import "./ToolBar.scss";

const ToolBarButton = ({ id, children, state, handleClick }) => (
  <Button 
    id={id}
    className={`toolBar__button ${state ? "toolBar__button--active" : ""}`}
    disableRipple={true} 
    disableFocusRipple={true}
    onClick={handleClick}
  >
    {children}
  </Button>
);

const LeftAlignButton = ({ handleClick }) => (
  <ToolBarButton id="align-left" handleClick={handleClick}>
    <FormatAlignLeftIcon/>
  </ToolBarButton>
);

const CenterAlignButton = ({ handleClick }) => (
  <ToolBarButton id="align-center" handleClick={handleClick}>
    <FormatAlignCenterIcon/>
  </ToolBarButton>
);

const RightAlignButton = ({ handleClick }) => (
  <ToolBarButton id="align-right" handleClick={handleClick}>
    <FormatAlignRightIcon/>
  </ToolBarButton>
);

const AlignStyles = ({ handleApplyBlockStyle }) => {
  
  return (
    <div>
      <LeftAlignButton handleClick={handleApplyBlockStyle}/>
      <CenterAlignButton handleClick={handleApplyBlockStyle}/>
      <RightAlignButton handleClick={handleApplyBlockStyle}/>
    </div>
  );
};

const BoldButton = (props) => (
  <ToolBarButton id="bold" {...props}>
    <FormatBoldIcon/>
  </ToolBarButton>
);

const ItalicButton = (props) => (
  <ToolBarButton id="italic" {...props}>
    <FormatItalicIcon/>
  </ToolBarButton>
);

const UnderlineButton = (props) => (
  <ToolBarButton id="text-underline" {...props}>
    <FormatUnderlinedIcon/>
  </ToolBarButton>
);

const StrikethroughButton = (props) => (
  <ToolBarButton id="strikethrough" {...props}>
    <FormatStrikeThroguhIcon/>
  </ToolBarButton>
);


const getMainFontStylesStates = ({ 
  fontWeight,
  fontStyle,
  textDecoration
}) => ({
  bold: fontWeight === "bold",
  italic: fontStyle === "italic",
  underline: textDecoration && textDecoration.includes("underline"),
  strikethrough: textDecoration && textDecoration.includes("line-through")
});

const MainFontStyles = ({ cellStyles, handleTextStyle }) => {
  const { bold, italic, underline, strikethrough } =  getMainFontStylesStates(cellStyles);

  return (
    <div>
      <BoldButton state={bold} handleClick={handleTextStyle}/>
      <ItalicButton state={italic} handleClick={handleTextStyle}/>
      <UnderlineButton state={underline} handleClick={handleTextStyle}/>
      <StrikethroughButton state={strikethrough} handleClick={handleTextStyle}/>
    </div>
  )
};

const ToolBar = ({
  type,
  eventListenerRef
}) => {
  const cellStyles = useSelector(({
    ui: {
      excel: {
        sheetCellData,
        activeCellPosition: { x, y }
      }
    }
  }) => sheetCellData[y] && sheetCellData[y][x] && sheetCellData[y][x].styles ? sheetCellData[y][x].styles : {});

  const handleApplyBlockStyle = ({ currentTarget: { id } }) => eventListenerRef.current.applyBlockStyle(id);
  const handleTextStyle = ({ currentTarget: { id } }) => eventListenerRef.current.applyTextStyle(id);

  return (
    <div className="toolBar">
      <MainFontStyles  handleTextStyle={handleTextStyle} cellStyles={cellStyles}/>
      <Divider orientation="vertical"/>
      <AlignStyles handleApplyBlockStyle={handleApplyBlockStyle} cellStyles={cellStyles}/>
    </div>
  );
};

export default ToolBar;