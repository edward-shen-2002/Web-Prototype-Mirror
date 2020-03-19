import { PureComponent } from "react";

import { 
  adminTemplateRoleAxios,
  adminEditBundleRoleAxios, 
  adminReviewBundleRoleAxios, 
  adminApproveBundleRoleAxios,
  adminBundleRoleAxios
} from "@tools/rest";

import { connect } from "react-redux";

import pako from "pako";

import cloneDeep from "clone-deep";

import uniqid from "uniqid";

import { ReactEditor } from "slate-react";

import { Transforms, Editor } from "slate";

import { extractReactAndWorkbookState } from "@tools/excel";

import { 
  CustomEditor
} from "@tools/slate";


import topOffsetsSelector from "@selectors/ui/excel/topOffsets";
import leftOffsetsSelector from "@selectors/ui/excel/leftOffsets";

import { 
  generateNewSheetName,
  createBlankSheet,
  downloadWorkbook
} from "@tools/excel";

import {
  isObjectEmpty
} from "@tools/misc";

import {
  editorToRichTextMap,
  richTextToEditorMap
} from "@constants/styles";

import { 
  REST_ADMIN_TEMPLATES,
  REST_ADMIN_BUNDLES_WORKFLOW
} from "@constants/rest";

const mapStateToProps = ({ 
  domain: {
    account
  },
  ui: { 
    excel
  }
}) => ({
  ...excel,
  topOffsets: topOffsetsSelector(excel),
  leftOffsets: leftOffsetsSelector(excel),
  account
});



class EventListener extends PureComponent {
  constructor(props) {
    super(props);

    // Get data from session storage, then delete session storage
    const { 
      sheetNames,
      activeSheetName
    } = props;

    this.inactiveSheets = {};

    const compressedInactiveSheets = JSON.parse(sessionStorage.getItem("inactiveSheets"));

    sheetNames.filter((sheetName) => sheetName !== activeSheetName)
      .forEach((sheetName) => {
        this.inactiveSheets[sheetName] = JSON.parse(pako.inflate(compressedInactiveSheets[sheetName], { to: "string" }));
      });

    sessionStorage.removeItem("inactiveSheets");
  }


  changeActiveInputData(data) {
    const { handleUpdateActiveCellInputData } = this.props;

    if(data.cellValue || data.formulaValue) {
      if(!data.cellValue) data.cellValue = cloneDeep(data.formulaValue);
      if(!data.formulaValue) data.formulaValue = cloneDeep(data.cellValue);
    }
    
    handleUpdateActiveCellInputData(data);
  }

  focusFormulaInput() {
    this.setInputAutoFocusOff();
    this.enableEditMode();
  }

  blurFormulaInput() {
    this.setInputAutoFocusOn();
  }

  resetActiveCellInputData() {
    const { handleResetActiveCellInputData } = this.props;
    handleResetActiveCellInputData();
  }

  saveTemplate(commonProps) {
    const {
      isTemplatePublished,
      templateId
    } = this.props;

    commonProps.isTemplatePublished = isTemplatePublished;

    const fileStates = extractReactAndWorkbookState(commonProps, this.inactiveSheets);

    const newTemplate = {
      published: isTemplatePublished,
      fileStates,
      name: fileStates.name
    };

    // ! Add more checks
    adminTemplateRoleAxios.put(`${REST_ADMIN_TEMPLATES}/${templateId}`, { newTemplate })
      .catch((error) => console.error(error))
  }

  saveBundle(bundleAxiosRouter, commonProps) {
    const {
      bundleId,
      templateId
    } = this.props;

    const fileStates = extractReactAndWorkbookState(commonProps, this.inactiveSheets);

    bundleAxiosRouter.put(
      `${REST_ADMIN_BUNDLES_WORKFLOW}/${bundleId}/workbook/${templateId}`,
      { workbook: fileStates }
      )
      .catch((error) => {
        console.error(error);
      });
  }

  saveEditBundle(commonProps) {
    this.saveBundle(adminEditBundleRoleAxios, commonProps);
  }

  saveReviewBundle(commonProps) {
    this.saveBundle(adminReviewBundleRoleAxios, commonProps);
  }

  saveApproveBundle(commonProps) {
    this.saveBundle(adminApproveBundleRoleAxios, commonProps);
  }

  saveManagerBundle(commonProps) {
    this.saveBundle(adminBundleRoleAxios, commonProps);
  }

  save() {
    const {
      type,
      name,
      activeSheetName,
      sheetNames,
      activeCellPosition,
      sheetCellData,
      sheetColumnCount,
      sheetColumnWidths,
      sheetFreezeColumnCount,
      sheetRowCount,
      sheetRowHeights,
      sheetFreezeRowCount,
      sheetHiddenColumns,
      sheetHiddenRows,
      stagnantSelectionAreas
    } = this.props;

    let commonProps = {
      name,
      activeSheetName,
      sheetNames,
      activeCellPosition,
      sheetCellData,
      sheetColumnCount,
      sheetColumnWidths,
      sheetFreezeColumnCount,
      sheetRowCount,
      sheetRowHeights,
      sheetFreezeRowCount,
      sheetHiddenColumns,
      sheetHiddenRows,
      stagnantSelectionAreas
    };

    if(type === "template") {
      this.saveTemplate(commonProps);
    } else if(type === "bundle_edit") {
      this.saveEditBundle(commonProps);
    } else if(type === "bundle_review") {
      this.saveReviewBundle(commonProps);
    } else if(type === "bundle_approve") {
      this.saveApproveBundle(commonProps);
    }
  }

  addSheet() {
    const {
      activeSheetName,
      sheetNames,
      handleUpdateSheetNames
    } = this.props;
    
    const newSheetName = generateNewSheetName(sheetNames);
    const newSheetData = createBlankSheet();

    this.inactiveSheets[newSheetName] = newSheetData;

    const activeSheetNameIndex = sheetNames.indexOf(activeSheetName);

    handleUpdateSheetNames([ ...sheetNames.slice(0, activeSheetNameIndex + 1), newSheetName, ...sheetNames.slice(activeSheetNameIndex + 1) ]);

    this.changeSheet(newSheetName);
  }

  setReadOnly() {
    const {
      sheetCellData,
      stagnantSelectionAreas,
      activeCellPosition,
      handleUpdateSheetCellData
    } = this.props;

    const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

    let newSheetCellData = cloneDeep(sheetCellData);

    if(stagnantSelectionAreasLength) {
      let areaPositionSet = {};
      
      stagnantSelectionAreas.forEach(({ x1, x2, y1, y2 }) => {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);

        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);

        for(let row = minY; row <= maxY; row++) {
          if(!areaPositionSet[row]) areaPositionSet[row] = {};

          for(let column = minX; column <= maxX; column++) areaPositionSet[row][column] = true;
        }
      });
    
      for(let row in areaPositionSet) {
        const columns = areaPositionSet[row];
        
        if(!newSheetCellData[row]) newSheetCellData[row] = {};

        for(let column in columns) newSheetCellData[row][column] = { ...newSheetCellData[row][column], isReadOnly: true }; 
      }
    } else {
      const { x, y } = activeCellPosition;

      if(!newSheetCellData[y]) newSheetCellData[y] = {};
      
      newSheetCellData[y][x] = { ...newSheetCellData[y][x], isReadOnly: true }; 
    }

    handleUpdateSheetCellData(newSheetCellData);
  }

  unsetReadOnly() {
    const {
      sheetCellData,
      stagnantSelectionAreas,
      activeCellPosition,
      handleUpdateSheetCellData
    } = this.props;

    const stagnantSelectionAreasLength = stagnantSelectionAreas.length;

    let newSheetCellData = cloneDeep(sheetCellData);

    if(stagnantSelectionAreasLength) {
      let areaPositionSet = {};
      
      stagnantSelectionAreas.forEach(({ x1, x2, y1, y2 }) => {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);

        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);

        for(let row = minY; row <= maxY; row++) {
          if(!areaPositionSet[row]) areaPositionSet[row] = {};

          for(let column = minX; column <= maxX; column++) areaPositionSet[row][column] = true;
        }
      });
    
      for(let row in areaPositionSet) {
        const columns = areaPositionSet[row];
        
        if(!newSheetCellData[row]) continue;

        for(let column in columns) {
          if(newSheetCellData[row][column]) {
            delete newSheetCellData[row][column].isReadOnly;
  
            if(isObjectEmpty(newSheetCellData[row][column])) {
              delete newSheetCellData[row][column];
  
              if(isObjectEmpty(newSheetCellData[row])) delete newSheetCellData[row];
            }
          }
        }
      }
    } else {
      const { x, y } = activeCellPosition;

      if(newSheetCellData[y]) {
        if(newSheetCellData[y][x]) {
          delete newSheetCellData[y][x].isReadOnly;

          if(isObjectEmpty(newSheetCellData[y][x])) {
            delete newSheetCellData[y][x];

            if(isObjectEmpty(newSheetCellData[y])) delete newSheetCellData[y];
          }
        }
      }
    }

    handleUpdateSheetCellData(newSheetCellData);
  }

  addComment(comment) {
    const {
      sheetCellData,
      activeCellPosition,
      account: {
        _id: accountId,
        firstName,
        lastName
      },
      handleUpdateSheetCellData
    } = this.props;

    const newSheetCellData = cloneDeep(sheetCellData);

    const { x, y } = activeCellPosition;

    if(!newSheetCellData[y]) newSheetCellData[y] = {};

    if(!newSheetCellData[y][x]) newSheetCellData[y][x] = {};

    if(!newSheetCellData[y][x].comments) newSheetCellData[y][x].comments = [];

    const commentData = {
      id: uniqid(),
      by: `${firstName} ${lastName}`,
      accountId,
      comment
    };
    
    newSheetCellData[y][x].comments.push(commentData);
    
    handleUpdateSheetCellData(newSheetCellData);
  }

  // ! Do not check for edge cases for now - no time (deleting comments of other users...)
  deleteComment(commentId, _accountId) {
    const {
      sheetCellData,
      activeCellPosition,
      handleUpdateSheetCellData
    } = this.props;

    const newSheetCellData = cloneDeep(sheetCellData);

    const { x, y } = activeCellPosition;

    if(newSheetCellData[y] && newSheetCellData[y][x]) {
      let { comments } = newSheetCellData[y][x];

      if(comments) {
        const commentIndex = comments.findIndex(({ id }) => id === commentId);

        if(commentIndex >= 0) {
          newSheetCellData[y][x].comments = [ ...comments.slice(0, commentIndex), ...comments.slice(commentIndex + 1) ];
          // ! Need to make a function for this... tedious 
          if(!newSheetCellData[y][x].comments.length) delete newSheetCellData[y][x].comments;
          if(isObjectEmpty(newSheetCellData[y][x])) delete newSheetCellData[y][x];
          if(isObjectEmpty(newSheetCellData[y])) delete newSheetCellData[y];
          return handleUpdateSheetCellData(newSheetCellData);
        }
      } 
    }

    console.error("Comment not found");
  }

  updateActiveCellDialog(type) {
    const {
      activeCellDialog,
      handleUpdateActiveCellDialog
    } = this.props;

    if(activeCellDialog !== type) handleUpdateActiveCellDialog(type);
  }

  resetActiveCellDialog() {
    const {
      activeCellDialog,
      handleResetActiveCellDialog
    } = this.props;

    if(activeCellDialog) handleResetActiveCellDialog(null);
  }

  changeBusinessConcept(type, concept) {
    const {
      activeCellPosition,
      sheetCellData,
      handleUpdateSheetCellData
    } = this.props;
    const { x, y } = activeCellPosition;

    let newSheetCellData = cloneDeep(sheetCellData);

    if(type === "attribute") {
      if(!newSheetCellData[1]) newSheetCellData[1] = {};

      newSheetCellData[1][x] = { value: concept, type: "normal" };
    } else {
      if(!newSheetCellData[y]) newSheetCellData[y] = {};

      // ! Should we remove everything?
      newSheetCellData[y][1] = { ...newSheetCellData[y][1], value: concept, type: "normal" };
    }

    handleUpdateSheetCellData(newSheetCellData);
  }

  resetActiveSelectionArea() {
    const {
      activeSelectionArea,
      handleResetActiveSelectionArea
    } = this.props;

    // ! Adjust selection area index?
    if(activeSelectionArea) handleResetActiveSelectionArea();
  }


  // ! TODO : selection instead of just active cell


  // ! Make the active style be the focus of styles
  applyBlockStyle(property, propertyValue) {
    let {
      sheetCellData,
      handleUpdateSheetCellData
    } = this.props;
    // Get the rows/columns 
    // ! Consider border enclosure -- is it by cell or by range?
    let containedArea = this._getAllAreas();

    for(let row in containedArea) {
      const rowArea = containedArea[row];

      if(!sheetCellData[row]) sheetCellData[row] = {};

      for(let column in rowArea) {
        if(!sheetCellData[row][column]) sheetCellData[row][column] = {};

        const {
          property: blockProperty,
          style: blockPropertyStyle
        } = editorToRichTextMap[property];

        if(blockProperty) {
          if(blockPropertyStyle) {
            if(!sheetCellData[row][column].styles) sheetCellData[row][column].styles = {};

            let cellStyles = sheetCellData[row][column].styles;

            if(cellStyles[blockProperty]) {
              const potentialStyles = Object.values(richTextToEditorMap[blockProperty]).length;

              if(potentialStyles > 1) {
                let presentStyles = cellStyles[blockProperty].split(" ");

                const potentialIndex = presentStyles.findIndex((style) => style === blockPropertyStyle);

                if(potentialIndex > -1) {
                  cellStyles[blockProperty] = presentStyles.splice(blockPropertyStyle, potentialIndex).join(" ");
                } else {
                  cellStyles[blockProperty] = `${cellStyles[blockProperty]} ${blockPropertyStyle}`; 
                }
              } else {
                // Replace style
                delete cellStyles[blockProperty];
              }
            } else {
              cellStyles[blockProperty] = blockPropertyStyle;
            }
          } else {
            // ! Custom style - Make use of property value

          }
        } else {
          console.error("Style not supported");
        }
      }
    }

    handleUpdateSheetCellData(sheetCellData);

    this.saveActiveCellInputData();
    this.disableEditMode();
  }

  applyTextStyle(property, propertyValue) {
    const {
      isEditMode,
      activeCellInputData: {
        formulaEditor,
        cellEditor
      }
    } = this.props;

    if(isEditMode) {
      ReactEditor.focus(cellEditor);
      Transforms.select(cellEditor, Editor.end(cellEditor, []));

      if(propertyValue) {
        
      } else {
        CustomEditor.toggleMark(formulaEditor, property);
        CustomEditor.toggleMark(cellEditor, property);
      }
    } else {
      // Apply block style
      this.applyBlockStyle(property, propertyValue);
    }
  }

  download() {
    const { name, activeSheetName } = this.props;

    const sheets = {
      [ activeSheetName ]: this.props,
      ...this.inactiveSheets
    };

    downloadWorkbook(name, activeSheetName, sheets);
  }
};

EventListener = connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(EventListener);

export default EventListener;