import React, { useCallback } from "react";

import { useSelector, shallowEqual, useDispatch} from "react-redux";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatStrikeThroguhIcon from "@material-ui/icons/StrikethroughS";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import FormatColorTextIcon from "@material-ui/icons/FormatColorText";
import MergeTypeIcon from "@material-ui/icons/MergeType";

import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";

import { getMainFontStylesStates } from "@tools/styles";
import { getMainFontStyleEditorStates } from "@tools/slate";

import { mergeCells } from "@actions/ui/excel/commands";

import "./ToolBar.scss";

const ToolBarButton = ({ 
  id, 
  children, 
  state, 
  className,
  handleClick 
}) => (
  <Button 
    id={id}
    className={`toolBar__button ${state ? "toolBar__button--active" : ""} ${className}`}
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

const MergeCellButton = ({ handleClick }) => (
  <ToolBarButton handleClick={handleClick}>
    <MergeTypeIcon/>
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

const CellStyles = ({
  isMergeAvailable
}) => {
  const dispatch = useDispatch();

  const handleMerge = useCallback(
    () => dispatch(mergeCells()),
    [ dispatch ]
  );

  return (
    <div>
      <MergeCellButton 
        disabled={!isMergeAvailable}
        handleClick={handleMerge}
      />
    </div>
  );
};

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

const ToolBar = () => {
  const { 
    cellStyles, 
    cellEditor, 
    isSheetFocused,
    isEditMode,
    isMergeAvailable
  } = useSelector(
    ({
      ui: {
        excel: {
          present: {
            sheetCellData,
            isSheetFocused,
            activeCellPosition: { x, y },
            activeCellInputData: {
              cellEditor
            },
            stagnantSelectionAreas,
            isEditMode
          }
        }
      }
    }) => ({
      isMergeAvailable: stagnantSelectionAreas.length <= 1,
      isEditMode,
      isSheetFocused,
      cellEditor,
      cellStyles: sheetCellData[y] && sheetCellData[y][x] && sheetCellData[y][x].styles ? sheetCellData[y][x].styles : {}
    }),
    shallowEqual
  );

  const handleApplyBlockStyle = ({ currentTarget: { id } }) => {};
  const handleTextStyle = ({ currentTarget: { id } }) => {};

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
      <Divider orientation="vertical"/>
      <CellStyles isMergeAvailable={isMergeAvailable}/>
    </div>
  );
};

export default ToolBar;