import React, { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";

import { publicAxios } from "@tools/rest";

import { 
  getNormalRowHeight, 
  getNormalColumnWidth,
  isPrepopulateString,
  parsePrepopulateString
} from "@tools/excel";

import { Editor } from "draft-js";

import Popover, { ArrowContainer } from "react-tiny-popover";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { REST_PUBLIC_DATA } from "@constants/rest";

import topOffsetsSelector from "@selectors/ui/excel/topOffsets";
import leftOffsetsSelector from "@selectors/ui/excel/leftOffsets";

import "./ActiveCell.scss";

const DialogActions = ({
  handleAdd,
  handleCancel
}) => (
  <ButtonGroup className="dialog__actions" fullWidth>
    <Button onClick={handleAdd}>Add</Button>
    <Button onClick={handleCancel}>Cancel</Button>
  </ButtonGroup>
);

const PersonAvatar = () => (
  <Avatar>
    <AccountCircleIcon />
  </Avatar>
);

const DeleteIconButton = ({ handleClick }) => (
  <IconButton onClick={handleClick}>
    <DeleteForeverIcon/>
  </IconButton>
);

const CommentListItemAvatar = () => (
  <ListItemAvatar>
    <PersonAvatar/>
  </ListItemAvatar>
);

const CommentActions = ({ handleRemove }) => (
  <ListItemSecondaryAction>
    <DeleteIconButton handleClick={handleRemove}/>
  </ListItemSecondaryAction>
);

const CommentsListItems = ({ 
  comments,
  handleRemoveComment
}) => comments.map(({ id, by, accountId, comment }) => {
  const handleRemove = () => handleRemoveComment(id, accountId);

  return (
    <ListItem key={id}>
      <CommentListItemAvatar/>
      <ListItemText primary={comment} secondary={by}/>
      <CommentActions handleRemove={handleRemove}/>
    </ListItem>
  );
});

const CommentsList = ({ 
  comments,
  handleRemoveComment 
}) => (
  <List className="dialog__list">
    <CommentsListItems 
      comments={comments}
      handleRemoveComment={handleRemoveComment}
    />
  </List>
);

const CommentInputSection = ({
  textFieldRef,
  handleChange,
  handleSaveComment,
  handleCloseActiveCellDialog
}) => (
  <div className="dialog__actions">
    <hr/>
    <TextField 
      inputRef={textFieldRef}
      className="dialog__field" 
      variant="outlined"
      multiline={true}
      onChange={handleChange}
      fullWidth
    />
    <DialogActions
      handleAdd={handleSaveComment}
      handleCancel={handleCloseActiveCellDialog}
    />
  </div>
);

const CommentDialog = ({
  comments,
  handleCloseActiveCellDialog,
  handleAddComment,
  handleDeleteComment
}) => {
  const textFieldRef = useRef();
  const [ comment, setComment ] = useState("");

  useEffect(() => {
    textFieldRef.current.focus();
  }, [ textFieldRef ]);

  const handleClick = () => textFieldRef.current.focus();
  const handleSaveComment = () => handleAddComment(comment);
  const handleRemoveComment = (commentId) => handleDeleteComment(commentId);
  const handleChange = ({ target: { value } }) => setComment(value);

  return (
    <div 
      className="dialog" 
      onClick={handleClick}
    >
      <Typography variant="h6" className="dialog__label">Comment</Typography>
      <CommentsList 
        comments={comments}
        handleRemoveComment={handleRemoveComment}
      />
      <CommentInputSection 
        textFieldRef={textFieldRef}
        handleChange={handleChange}
        handleSaveComment={handleSaveComment}
        handleCloseActiveCellDialog={handleCloseActiveCellDialog}
      />
    </div>
  );
};

const LabeledTextField = ({ 
  label, 
  text, 
  textFieldProps, 
  handleChange 
}) => (
  <div className="field">
    <Typography className="field__label">{label}</Typography>
    <TextField className="field__input" value={text} onChange={handleChange} {...textFieldProps} fullWidth/>
  </div>
);

const PrepopulateDialog = ({
  type,
  quarter,
  year,
  handleSetPrepopulate,
  handleCloseActiveCellDialog
}) => {
  const [ newType, setNewType ] = useState(type ? type : "");
  const [ newQuarter, setNewQuarter ] = useState(quarter ? quarter : "");
  const [ newYear, setNewYear ] = useState(year ? year : "");

  const handleChangeType = ({ target: { value } }) => setNewType(value);
  const handleChangeQuarter = ({ target: { value } }) => setNewQuarter(value);
  const handleChangeYear = ({ target: { value } }) => setNewYear(value);

  const handleChangePrepopulate = () => handleSetPrepopulate({ type: newType, quarter: newQuarter, year: newYear });

  return (
    <div className="dialog">
      <Typography variant="h6">Prepopulate</Typography>
      <LabeledTextField 
        label="Type" 
        text={newType} 
        handleChange={handleChangeType}
      />
      <LabeledTextField 
        label="Quarter" 
        text={newQuarter} 
        handleChange={handleChangeQuarter}
      />
      <LabeledTextField 
        label="Year" 
        text={newYear} 
        handleChange={handleChangeYear}
      />
      <DialogActions
        handleAdd={handleChangePrepopulate}
        handleCancel={handleCloseActiveCellDialog}
      />
    </div>
  );
};

const BusinessConceptsItems = ({ 
  businessConcepts, 
  type,
  handleChangeBusinessConcept 
}) => businessConcepts.map(({ _id, id, value }) => {
  const handleClick = () => handleChangeBusinessConcept(type, id);

  return (
    <ListItem
      key={_id}
      className="businessConcepts__item"
      alignItems="flex-start"
      button
      onClick={handleClick}
    >
      <div className="businessConcepts__id">{id}</div>
      <div className="businessConcepts__value">{value}</div>
    </ListItem>
  );
});

const BusinessConceptsList = ({ 
  businessConcepts, 
  type,
  handleChangeBusinessConcept 
}) => (
  <List className="businessConcepts">
    <BusinessConceptsItems 
      type={type}
      businessConcepts={businessConcepts}
      handleChangeBusinessConcept={handleChangeBusinessConcept}
    />
  </List>
);

const filterString = (query, value) =>  value.toString().toLowerCase().includes(query.toLowerCase());

const BusinessConceptDialog = ({
  type,
  handleChangeBusinessConcept
}) => {
  const [ businessConcepts, setBusinessConcepts ] = useState([]);
  const [ filter, setFilter ] = useState("");

  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      publicAxios.get(`${REST_PUBLIC_DATA}/business_concepts`)
        .then(({ data: { data: { businessConcepts } } }) => {
          setBusinessConcepts(businessConcepts);
          setIsDataFetched(true);
        })
        .catch((error) => console.error(error));
    }
  }, [ isDataFetched ]);

  const textFieldRef = useRef();

  useEffect(() => {
    textFieldRef.current.focus();
  }, [ textFieldRef ]);

  const filteredBusinessConcepts = businessConcepts.filter(({ id, value }) => filterString(filter, value) || filterString(filter, id));

  const handleChangeFilter = ({ target: { value } }) => setFilter(value);
  const handleClick = () => textFieldRef.current.focus();

  return (
    <div 
      className="dialog"
      onClick={handleClick}
    >
      <Typography variant="h6">Set {type}</Typography>
      <TextField 
        inputRef={textFieldRef}
        onChange={handleChangeFilter}
      />
      <BusinessConceptsList 
        type={type}
        businessConcepts={filteredBusinessConcepts}
        handleChangeBusinessConcept={handleChangeBusinessConcept}
      />
      {/* <DialogActions/> */}
    </div>
  );
};

const ActiveCellDialog = ({
  activeCellDialog,
  position,
  targetRect,
  popoverRect,
  comments,
  value,
  handleCloseActiveCellDialog,
  handleChangeBusinessConcept,
  handleAddComment,
  handleDeleteComment,
  handleSetPrepopulate
}) => {
  const handleKeyDownCapture = (event) => event.stopPropagation();
  const handleContextMenuCapture = (event) => event.stopPropagation();

  const commonChildrenProps = { 
    handleCloseActiveCellDialog 
  };

  let Children;

  if(activeCellDialog === "comment") {
    Children = (
      <CommentDialog 
        {...commonChildrenProps}
        comments={comments}
        handleAddComment={handleAddComment}
        handleDeleteComment={handleDeleteComment}
      />
    );
  } else if(activeCellDialog === "attribute" || activeCellDialog === "category") {
    Children = (
      <BusinessConceptDialog 
        {...commonChildrenProps} 
        type={activeCellDialog} 
        handleChangeBusinessConcept={handleChangeBusinessConcept}
      />
    );
  } else if(activeCellDialog === "prepopulate") {
    let groupValues;
    
    if(typeof value === "string" && isPrepopulateString(value)) {
      groupValues = parsePrepopulateString(value);
    } else {
      groupValues = {};
    }

    Children = (
      <PrepopulateDialog
        {...commonChildrenProps}
        {...groupValues}
        handleSetPrepopulate={handleSetPrepopulate}
      />
    );
  }

  return (
    <ArrowContainer
      position={position}
      targetRect={targetRect}
      popoverRect={popoverRect}
      arrowColor="green"
      arrowSize={10}
      arrowStyle={{ opacity: 0.7 }}
    >
      <div
        onKeyDownCapture={handleKeyDownCapture}
        onContextMenuCapture={handleContextMenuCapture}
      >
        {Children}
      </div>
    </ArrowContainer>
  );
};

const ActiveInputCell = ({ 
  activeCellStyle,
  activeCellInputAutoFocus,
  editorState,
  handleChangeActiveInputData
}) => {
  const editorRef = useRef(null);
  const handleChangeInputValue = (newEditorState) => {
    const currentContentState = editorState.getCurrentContent();
    const newContentState = newEditorState.getCurrentContent();

    if(currentContentState !== newContentState) handleChangeActiveInputData({ editorState: newEditorState });
  };

  const handleReturn = (event) => {
    const { key, ctrlKey, altKey } = event;
    if(key === "Escape") event.preventDefault();
    return key === "Enter" && (!ctrlKey && !altKey) ? "handled" : "not-handled";
  };

  const handleContextMenuCapture = (event) => event.stopPropagation();
  const handleKeyDownCapture = (event) => {
    const { key, ctrlKey } = event;

    if(
      ctrlKey && key === "a"
    ) event.stopPropagation();
  };

  return (
    <div 
      className="activeCell activeCell--editMode" 
      style={activeCellStyle}
      onContextMenuCapture={handleContextMenuCapture}
      onKeyDownCapture={handleKeyDownCapture}
    >
      <Editor
        key="active-cell-input"
        ref={editorRef}
        editorState={editorState}
        onChange={handleChangeInputValue}
        readOnly={!activeCellInputAutoFocus}
        handleReturn={handleReturn}
      />
    </div>
  );
};

const ActiveNormalCell = ({ 
  activeCellStyle,
  activeCellDialog,
  comments,
  value,
  handleCloseActiveCellDialog,
  handleChangeBusinessConcept,
  handleAddComment,
  handleDeleteComment,
  handleSetPrepopulate
}) => {

  return (
    activeCellDialog 
      ? <Popover
          isOpen={activeCellDialog}
          position="right"
          transitionDuration={0}
          content={(props) => (
            <ActiveCellDialog 
              {...props}
              activeCellDialog={activeCellDialog}
              comments={comments}
              value={value}
              handleCloseActiveCellDialog={handleCloseActiveCellDialog}
              handleChangeBusinessConcept={handleChangeBusinessConcept}
              handleAddComment={handleAddComment}
              handleDeleteComment={handleDeleteComment}
              handleSetPrepopulate={handleSetPrepopulate}
            />  
          )}
        >
          <div 
            key="inactive-cell-input" 
            className="activeCell activeCell--normalMode" 
            style={activeCellStyle}
          />
        </Popover>
      : <div 
          key="inactive-cell-input" 
          className="activeCell activeCell--normalMode" 
          style={activeCellStyle}
        />

  );
};

const mapStateToProps = ({
  ui: {
    excel: {
      activeCellInputData: { editorState },
      activeCellInputAutoFocus,
      activeCellPosition,

      isEditMode,
      activeCellDialog,

      sheetFreezeColumnCount,
      sheetFreezeRowCount,
      sheetColumnCount,
      sheetRowCount,
      sheetColumnWidths,
      sheetRowHeights,
      sheetCellData
    }
  }
}) => ({
  editorState,
  activeCellInputAutoFocus,

  activeCellPosition,

  isEditMode,
  activeCellDialog,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,
  sheetColumnCount,
  sheetRowCount,
  sheetColumnWidths,
  sheetRowHeights,
  sheetCellData,

  topOffsets: topOffsetsSelector({ sheetRowHeights, sheetRowCount }),
  leftOffsets: leftOffsetsSelector({ sheetColumnWidths, sheetColumnCount })
});

let ActiveCell = ({ 
  isEditMode, 
  editorState,
  activeCellInputAutoFocus,

  activeCellPosition,

  sheetFreezeColumnCount,
  sheetFreezeRowCount,

  sheetColumnCount,
  sheetRowCount,

  sheetColumnWidths,
  sheetRowHeights,

  sheetCellData,

  isActiveCellInCorrectPane,
  activeCellDialog,

  computeActiveCellStyle,

  topOffsets,
  leftOffsets,

  handleChangeActiveInputData,
  handleCloseActiveCellDialog,
  handleChangeBusinessConcept,
  handleAddComment,
  handleDeleteComment,
  handleSetPrepopulate
}) => {
  const { x, y } = activeCellPosition;

  useEffect(() => {
    if(isEditMode) handleCloseActiveCellDialog();
  }, [ isEditMode ]);

  useEffect(() => {
    if(activeCellDialog) handleCloseActiveCellDialog();
  }, [ x, y ]);

  if(!isActiveCellInCorrectPane(x, y, sheetFreezeColumnCount, sheetFreezeRowCount)) return null;

  let activeCellStyle;

  if(computeActiveCellStyle) {
    activeCellStyle = computeActiveCellStyle(x, y, sheetColumnWidths, leftOffsets, sheetRowHeights, topOffsets, sheetFreezeColumnCount, sheetFreezeRowCount);
    activeCellStyle.minHeight = activeCellStyle.height;
    activeCellStyle.minWidth = activeCellStyle.width;
  } else {
    let height = getNormalRowHeight(sheetRowHeights[y]);
    let width = getNormalColumnWidth(sheetColumnWidths[x]);

    activeCellStyle = {
      top: topOffsets[y], 
      left: leftOffsets[x], 
      height,
      width,
      minHeight: height,
      minWidth: width
    }
  }

  activeCellStyle.maxWidth = (leftOffsets[sheetColumnCount - 1] + getNormalColumnWidth(sheetColumnWidths[sheetColumnCount])) - leftOffsets[x];
  activeCellStyle.maxHeight = (topOffsets[sheetRowCount - 1] + getNormalRowHeight(sheetRowHeights[sheetRowCount])) - topOffsets[y];

  let displayedComments = [];
  let displayedValue = "";

  if(sheetCellData[y] && sheetCellData[y][x]) {
    const { comments, value } = sheetCellData[y][x];

    if(comments) displayedComments = comments;

    if(value) displayedValue = value;
  }

  return (
    isEditMode 
      ? <ActiveInputCell 
          activeCellStyle={activeCellStyle} 
          editorState={editorState}
          activeCellInputAutoFocus={activeCellInputAutoFocus}
          handleChangeActiveInputData={handleChangeActiveInputData}
        />
      : <ActiveNormalCell 
          activeCellStyle={activeCellStyle}
          activeCellDialog={activeCellDialog}
          comments={displayedComments}
          value={displayedValue}
          handleCloseActiveCellDialog={handleCloseActiveCellDialog}
          handleChangeBusinessConcept={handleChangeBusinessConcept}
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
          handleSetPrepopulate={handleSetPrepopulate}
        />
  );
};

ActiveCell = connect(mapStateToProps)(ActiveCell);

export default ActiveCell;