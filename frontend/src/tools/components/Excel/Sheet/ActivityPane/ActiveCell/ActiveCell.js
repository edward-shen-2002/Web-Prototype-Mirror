import React, { useState, useEffect, useRef, useMemo } from "react";

import { connect } from "react-redux";

import { publicAxios } from "@tools/rest";

import { getTopOffsets, getLeftOffsets, getNormalRowHeight, getNormalColumnWidth } from "@tools/excel";

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

import "./ActiveCell.scss";

const DialogActions = ({
  handleSaveComment,
  handleCloseActiveCellDialog
}) => (
  <ButtonGroup className="dialog__actions" fullWidth>
    <Button onClick={handleSaveComment}>Add</Button>
    <Button onClick={handleCloseActiveCellDialog}>Cancel</Button>
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
      handleSaveComment={handleSaveComment}
      handleCloseActiveCellDialog={handleCloseActiveCellDialog}
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
  handleCloseActiveCellDialog,
  handleChangeBusinessConcept,
  handleAddComment,
  handleDeleteComment
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
  const [ isMounted, setIsMounted ] = useState(false);
  const editorRef = useRef(null);
  const handleChangeInputValue = (newEditorState) => {
    const currentContentState = editorState.getCurrentContent();
    const newContentState = newEditorState.getCurrentContent();

    if(currentContentState !== newContentState) handleChangeActiveInputData({ editorState: newEditorState });
  };

  useEffect(() => {
    if(!isMounted) {
      // if(activeCellInputAutoFocus) editorRef.current.focus();
      setIsMounted(true);
    }
  });

  const handleReturn = (event) => {
    const { key, ctrlKey, altKey } = event;
    if(key === "Escape") event.preventDefault();
    return key === "Enter" && (!ctrlKey && !altKey) ? "handled" : "not-handled";
  };

  const handleContextMenuCapture = (event) => event.stopPropagation();
  const handleKeyDownCapture = (event) => event.stopPropagation();

  return (
    <div 
      className="activeCell activeCell--editMode" 
      style={activeCellStyle}
      onContextMenuCapture={handleContextMenuCapture}
    >
      <Editor
        key="active-cell-input"
        ref={editorRef}
        editorState={editorState}
        onChange={handleChangeInputValue}
        onKeyDownCapture={handleKeyDownCapture}
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
  handleCloseActiveCellDialog,
  handleChangeBusinessConcept,
  handleAddComment,
  handleDeleteComment
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
              handleCloseActiveCellDialog={handleCloseActiveCellDialog}
              handleChangeBusinessConcept={handleChangeBusinessConcept}
              handleAddComment={handleAddComment}
              handleDeleteComment={handleDeleteComment}
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
  sheetCellData
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

  handleChangeActiveInputData,
  handleCloseActiveCellDialog,
  handleChangeBusinessConcept,
  handleAddComment,
  handleDeleteComment
}) => {
  const topOffsets = useMemo(() => getTopOffsets(sheetRowHeights, sheetRowCount), [ sheetRowHeights, sheetRowCount ]);
  const leftOffsets = useMemo(() => getLeftOffsets(sheetColumnWidths, sheetColumnCount), [ sheetColumnWidths, sheetColumnCount ]);

  const { x, y } = activeCellPosition;

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

  const comments = sheetCellData[y] && sheetCellData[y][x] && sheetCellData[y][x].comments ? sheetCellData[y][x].comments : [];

  useEffect(() => {
    if(isEditMode) handleCloseActiveCellDialog();
  }, [ isEditMode ]);

  useEffect(() => {
    if(activeCellDialog) handleCloseActiveCellDialog();
  }, [ x, y ]);


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
          comments={comments}
          handleCloseActiveCellDialog={handleCloseActiveCellDialog}
          handleChangeBusinessConcept={handleChangeBusinessConcept}
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
        />
  );
};

ActiveCell = connect(mapStateToProps)(ActiveCell);

export default ActiveCell;