import React from "react";

import { useSelector, shallowEqual} from "react-redux";

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

import { getMainFontStylesStates } from "@tools/styles";
import { getMainFontStyleEditorStates } from "@tools/slate";

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
  <ToolBarButton id="underline" {...props}>
    <FormatUnderlinedIcon/>
  </ToolBarButton>
);

const StrikethroughButton = (props) => (
  <ToolBarButton id="strikethrough" {...props}>
    <FormatStrikeThroguhIcon/>
  </ToolBarButton>
);

const MainFontStyles = ({ 
  cellStyles, 
  cellEditor, 
  isEditMode,
  handleTextStyle 
}) => {
  let { bold, italic, underline, strikethrough } = (
    isEditMode 
      ? getMainFontStyleEditorStates(cellEditor)
      : getMainFontStylesStates(cellStyles)
  );

  return (
    <div>
      <BoldButton state={bold} handleClick={handleTextStyle}/>
      <ItalicButton state={italic} handleClick={handleTextStyle}/>
      <UnderlineButton state={underline} handleClick={handleTextStyle}/>
      <StrikethroughButton state={strikethrough} handleClick={handleTextStyle}/>
    </div>
  );
};

const ToolBar = ({
  type,
  eventListenerRef
}) => {
  const { 
    cellStyles, 
    cellEditor, 
    isSheetFocused,
    isEditMode 
  } = useSelector(
    ({
      ui: {
        excel: {
          sheetCellData,
          isSheetFocused,
          activeCellPosition: { x, y },
          activeCellInputData: {
            cellEditor
          },
          isEditMode
        }
      }
    }) => ({
      isEditMode,
      isSheetFocused,
      cellEditor,
      cellStyles: sheetCellData[y] && sheetCellData[y][x] && sheetCellData[y][x].styles ? sheetCellData[y][x].styles : {}
    }),
    shallowEqual
  );

  const handleApplyBlockStyle = ({ currentTarget: { id } }) => eventListenerRef.current.applyBlockStyle(id);
  const handleTextStyle = ({ currentTarget: { id } }) => eventListenerRef.current.applyTextStyle(id, null, isSheetFocused);

  return (
    <div className="toolBar">
      <MainFontStyles 
        cellStyles={cellStyles}
        cellEditor={cellEditor}
        isEditMode={isEditMode}
        handleTextStyle={handleTextStyle} 
      />
      <Divider orientation="vertical"/>
      <AlignStyles handleApplyBlockStyle={handleApplyBlockStyle} cellStyles={cellStyles}/>
    </div>
  );
};

export default ToolBar;