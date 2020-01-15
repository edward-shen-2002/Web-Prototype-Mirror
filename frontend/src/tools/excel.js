import XlsxPopulate, { RichText, Range } from "xlsx-populate";

import { sheetNameRegex } from "./regex";

import { EditorState, ContentState, RichUtils } from "draft-js";

import { isObjectEmpty } from "tools/misc";

import pako from "pako";

import Color from "color";

import { themes } from "constants/styles";

import { 
  EXCEL_ROW_HEIGHT_SCALE,
  EXCEL_COLUMN_WIDTH_SCALE,

  DEFAULT_EXCEL_SHEET_ROW_COUNT, 
  DEFAULT_EXCEL_SHEET_COLUMN_COUNT,

  EXCEL_SHEET_MAX_ROW_COUNT,
  EXCEL_SHEET_MAX_COLUMN_COUNT,

  DEFAULT_EXCEL_SHEET_ROW_HEIGHT,
  DEFAULT_EXCEL_SHEET_COLUMN_WIDTH,

  DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER,
  DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER,

  DEFAULT_EXCEL_SHEET_FREEZE_ROW_COUNT,
  DEFAULT_EXCEL_SHEET_FREEZE_COLUMN_COUNT
} from "constants/excel";

import { DEFAULT_SHEET_TEMPLATE_ID_MAPPING } from "constants/template";

import uniqid from "uniqid";

let size = -1;

// This utility copied from "dom-helpers" package. -- from react-window
export const getScrollbarSize = (recalculate = false) => {
  if (size === -1 || recalculate) {
    const div = document.createElement('div');
    const style = div.style;
    style.width = '50px';
    style.height = '50px';
    style.overflow = 'scroll';

    ((document.body)).appendChild(div);

    size = div.offsetWidth - div.clientWidth;

    ((document.body)).removeChild(div);
  }

  return size;
};

// Copied from react-window
export const getEstimatedTotalHeight = (
  { rowCount },
  { rowMetadataMap, estimatedRowHeight, lastMeasuredRowIndex }
) => {
  let totalSizeOfMeasuredRows = 0;
  
  // Edge case check for when the number of items decreases while a scroll is in progress.
  // https://github.com/bvaughn/react-window/pull/138
  if (lastMeasuredRowIndex >= rowCount) {
    lastMeasuredRowIndex = rowCount - 1;
  }

  if (lastMeasuredRowIndex >= 0) {
    const itemMetadata = rowMetadataMap[lastMeasuredRowIndex];
    totalSizeOfMeasuredRows = itemMetadata.offset + itemMetadata.size;
  }

  const numUnmeasuredItems = rowCount - lastMeasuredRowIndex - 1;
  const totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedRowHeight;
  
  return totalSizeOfMeasuredRows + totalSizeOfUnmeasuredItems;
};

// Copied from react-window
export const getEstimatedTotalWidth = (
  { columnCount },
  {
    columnMetadataMap,
    estimatedColumnWidth,
    lastMeasuredColumnIndex,
  }
) => {
  let totalSizeOfMeasuredRows = 0;
  
  // Edge case check for when the number of items decreases while a scroll is in progress.
  // https://github.com/bvaughn/react-window/pull/138
  if (lastMeasuredColumnIndex >= columnCount) {
    lastMeasuredColumnIndex = columnCount - 1;
  }
  
  if (lastMeasuredColumnIndex >= 0) {
    const itemMetadata = columnMetadataMap[lastMeasuredColumnIndex];
    totalSizeOfMeasuredRows = itemMetadata.offset + itemMetadata.size;
  }
  
  const numUnmeasuredItems = columnCount - lastMeasuredColumnIndex - 1;
  const totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedColumnWidth;
  
  return totalSizeOfMeasuredRows + totalSizeOfUnmeasuredItems;
};

export const generateNewSheetName = (sheetNames) => {
  let uniqueSheetNumber = sheetNames.length + 1;
  
  sheetNames.forEach((name) => {
    const match = name.match(sheetNameRegex);
    
    if(match && uniqueSheetNumber <= match[1]) uniqueSheetNumber++;
  });
  
  return `Sheet${uniqueSheetNumber}`;
};

export const isPositionEqualArea = ({ x, y }, { x1, y1, x2, y2 }) => x === x1 && x === x2 && y === y1 && y === y2;

export const getNormalRowHeight = (rowHeight) => rowHeight ? rowHeight * EXCEL_ROW_HEIGHT_SCALE : DEFAULT_EXCEL_SHEET_ROW_HEIGHT;
export const getNormalColumnWidth = (columnWidth) => columnWidth ? columnWidth * EXCEL_COLUMN_WIDTH_SCALE : DEFAULT_EXCEL_SHEET_COLUMN_WIDTH;
export const getExcelColumnWidth = (columnWidth) => columnWidth ? columnWidth/EXCEL_COLUMN_WIDTH_SCALE : columnWidth;
export const getExcelRowHeight = (rowHeight) => rowHeight ? rowHeight/EXCEL_ROW_HEIGHT_SCALE : rowHeight;
  
export const getWorkbookInstance = async ({
  activeSheetName,
  sheetNames,
  activeCellPosition,
  sheetsCellData,
  sheetsColumnCount,
  sheetsColumnWidths,
  sheetsFreezeColumnCount,
  sheetsRowCount,
  sheetsRowHeights,
  sheetsFreezeRowCount
}) => {
  let Workbook = await XlsxPopulate.fromBlankAsync();
  const { x, y } = activeCellPosition;

  const sheetNamesLength = sheetNames.length;

  for(let sheetNameIndex = 0; sheetNameIndex < sheetNamesLength; sheetNameIndex++) {
    const sheetName = sheetNames[sheetNameIndex];

    const sheetCellData = sheetsCellData[sheetName];
    const sheetColumnCount = sheetsColumnCount[sheetName];
    const sheetColumnWidths = sheetsColumnWidths[sheetName];
    const sheetFreezeColumnCount = sheetsFreezeColumnCount[sheetName];
    const sheetRowCount = sheetsRowCount[sheetName];
    const sheetRowHeights = sheetsRowHeights[sheetName];
    const sheetFreezeRowCount = sheetsFreezeRowCount[sheetName];

    // May be a default sheet
    let sheet =  sheetName === "Sheet1" ? await Workbook.sheet(sheetName) : await Workbook.addSheet(sheetName);

    sheet.freezePanes(sheetFreezeColumnCount, sheetFreezeRowCount);

    for(let row in sheetCellData) {
      row = parseInt(row);
      
      let columns = Object.keys(sheetCellData[row]);

      columns.forEach((column) => {
        column = parseInt(column);

        const { value } = sheetCellData[row][column];
  
        if(value !== undefined) {
          const sheetCell = sheet.row(row).cell(column);
          sheetCell.setValue(value);
        }
      })
    }

    // Set row heights
    for(let row = 1; row < sheetRowCount; row++) {
      const sheetRowHeight = sheetRowHeights[row];

      if(sheetRowHeight) sheet.row(row).height(sheetRowHeight);
    }

    // Set column widths
    for(let column = 1; column < sheetColumnCount; column++) {
      const sheetColumnWidth = sheetColumnWidths[column];

      if(sheetColumnWidth) sheet.column(column).width(sheetColumnWidth);
    }
  };

  // Set active sheet and cell
  const activeSheet = Workbook.sheet(activeSheetName);
  activeSheet.active(true);
  activeSheet.row(y).cell(x).active(true);

  return Workbook;
};

export const getCellData = (sheetCellData, row, column) => (
  sheetCellData[row] && sheetCellData[row][column] !== undefined
    ? sheetCellData[row][column]
    : undefined
);


export const getSheetHeaderCount = (sheet) => {
  const sheetUsedRange = sheet.usedRange();

  let headerCount = {};

  let maxColumnNumber = 1;
  let maxRowNumber = 1;

  if(sheetUsedRange) {
    const { _maxColumnNumber, _maxRowNumber } = sheetUsedRange;

    maxColumnNumber = Math.min(_maxColumnNumber + 1, EXCEL_SHEET_MAX_COLUMN_COUNT);
    maxRowNumber = Math.min(_maxRowNumber + 1, EXCEL_SHEET_MAX_ROW_COUNT);
  } 

  headerCount.sheetColumnCount = Math.max(maxColumnNumber, DEFAULT_EXCEL_SHEET_COLUMN_COUNT + 1);
  headerCount.sheetRowCount = Math.max(maxRowNumber, DEFAULT_EXCEL_SHEET_ROW_COUNT + 1);

  return headerCount;
};

export const getSheetColumnsData = (sheet, columnCount) => {
  let sheetColumnWidths = {};

  let sheetHiddenColumns = {};

  for(let column = 1; column < columnCount; column++) {
    let width;

    const sheetColumn = sheet.column(column);

    if(sheetColumn.hidden()) sheetHiddenColumns[column] = true;

    width = sheetColumn.width();

    if(width) sheetColumnWidths[column] = width;
  }

  return { sheetColumnWidths, sheetHiddenColumns };
};

export const getSheetRowsData = (sheet, rowCount) => {
  let sheetRowHeights = {};

  let sheetHiddenRows = {};

  for(let row = 1; row < rowCount; row++) {
    let height;
    const sheetRow = sheet.row(row);

    if(sheetRow.hidden()) sheetHiddenRows[row] = true;

    height = sheetRow.height();
    if(height) sheetRowHeights[row] = height;
  }

  return { sheetRowHeights, sheetHiddenRows };
};

// TODO
const convertXlsxColorToCss = ({ rgb, theme, tint }) => {
  let convertedStyle;

  if(rgb) {
    convertedStyle = `#${rgb.length === 6 ? rgb : rgb.substring(2)}`;
  } else if (theme !== undefined) {
    convertedStyle = themes[theme];

    if(tint) convertedStyle = applyTintToColour(convertedStyle, tint);
  }

  return convertedStyle;
};

// ! From https://github.com/Qix-/color/issues/53#issuecomment-487822576
const lightenBy = (color, ratio) => {
  const lightness = color.lightness();
  return color.lightness(lightness + (100 - lightness) * ratio);
};

const darkenBy = (color, ratio) => color.lightness(color.lightness() * (1 - ratio));

const applyTintToColour = (color, tint) => {
  color = Color(color);

  if(tint >= 0) {
    color = lightenBy(color, tint);
  } else {
    color = darkenBy(color, -tint);
  }

  return color.hex();
};

// TODO
export const convertXlsxStyleToInlineStyle = (xlsxStyle) => {
  let inlineStyle = {};

  const {
    bold,
    italic,
    underline,
    strikethrough,
    subscript,
    superscript,
    fontSize,
    fontFamily,
    fontGenericFamily,
    fontScheme,
    fontColor,
    horizontalAlignment,
    justifyLastLine,
    indent,
    verticalAlignment,
    wrapText,
    shrinkToFit,
    textDirection,
    textRotation,
    angleTextCounterclockwise,
    angleTextClockwise,
    rotateTextUp,
    rotateTextDown,
    verticalText,
    fill,
    border,
    borderColor,
    borderStyle,
    leftBorder, 
    rightBorder, 
    topBorder, 
    bottomBorder, 
    diagonalBorder,
    diagonalBorderDirection, 
    numberFormat
  } = xlsxStyle;

  // ! TODO
  // if(borderColor) console.log("b", borderColor);
  // if(leftBorder) console.log("lb", leftBorder);
  // if(rightBorder) console.log("rb", rightBorder);
  // if(topBorder) console.log("tb", topBorder);
  // if(bottomBorder) console.log("bb", bottomBorder);
  // if(borderStyle) console.log("bs", borderStyle);

  if(bold) inlineStyle.fontWeight = "bold";
  if(italic) inlineStyle.fontStyle = "italic";
  if(underline) inlineStyle.textDecoration = "underline";
  if(strikethrough) inlineStyle.textDecoration = underline ? inlineStyle.textDecoration + " line-through" : "line-through";
  if(subscript) inlineStyle.verticalAlign = "sub";
  if(superscript) inlineStyle.verticalAlign = "super";

  if(fontSize) inlineStyle.fontSize = fontSize;

  if(fontFamily) inlineStyle.fontFamily = fontFamily;

  if(fontColor) inlineStyle.color = convertXlsxColorToCss(fontColor);

  if(fill) {
    let { 
      type, 
      color 
    } = fill;

    if(type === "solid") inlineStyle.backgroundColor = convertXlsxColorToCss(color);
  }

  if(horizontalAlignment) inlineStyle.textAlign = horizontalAlignment;

  // if(verticalAlignment) inlineStyle.verticalAlign = verticalAlignment;


  // if(bottomBorder) console.log(bottomBorder)

  return inlineStyle;
};

// TODO
export const convertInlineStyleToXlsxStyle = (inlineStyle) => {
  let xlsxStyle ={};

};

export const extractCellStyle = (cellData) => {
  let cellStyles = (
    cellData
      ? cellData.style([
          // Can be block style or rich text
          // If cell is richtext, this is the data that is on the first fragment
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "subscript",
          "superscript",
          "fontSize",
          "fontFamily",
          "fontGenericFamily",
          "fontScheme",
          "fontColor",

          // Strictly block styles
          "horizontalAlignment",
          "justifyLastLine",
          "indent",
          "verticalAlignment",
          "wrapText",
          "shrinkToFit",
          "textDirection",
          "textRotation",
          "angleTextCounterclockwise",
          "angleTextClockwise",
          "rotateTextUp",
          "rotateTextDown",
          "verticalText",
          "fill",
          "border",
          "borderColor",
          "borderStyle",
          "leftBorder", 
          "rightBorder", 
          "topBorder", 
          "bottomBorder", 
          "diagonalBorder",
          "diagonalBorderDirection", 
          "numberFormat"
        ])
      : {}
  );

  for(let styleName in cellStyles) {
    const styleValue = cellStyles[styleName];

    if(!styleValue) delete cellStyles[styleName];
  }

  if(cellStyles.numberFormat === "General") delete cellStyles["numberFormat"];

  if(isObjectEmpty(cellStyles.border)) delete cellStyles["border"]; 

  return isObjectEmpty(cellStyles) ? undefined : convertXlsxStyleToInlineStyle(cellStyles);
};

export const extractCellRichTextStyle = (cellData) => {
  let cellStyles = (
    cellData
      ? cellData.style([
        "bold", 
        "italic", 
        "underline", 
        "strikethrough", 
        "subscript", 
        "fontSize", 
        "fontFamily", 
        "fontGenericFamily", 
        "fontScheme", 
        "fontColor"
        ])
      : {}
  );

  for(let styleName in cellStyles) {
    const styleValue = cellStyles[styleName];

    if(!styleValue) delete cellStyles[styleName];
  }

  return isObjectEmpty(cellStyles) ? undefined : convertXlsxStyleToInlineStyle(cellStyles);
};

// ! TODO - missing some styles
export const getCellInlineStyle = (cellSyles) => {
  if(cellSyles === undefined) return undefined;

  const {
    fontWeight, 
    fontStyle, 
    textDecoration, 
    verticalAlign, 
    fontSize, 
    fontFamily, 
  } = cellSyles;

  return {
    fontWeight, 
    fontStyle, 
    textDecoration, 
    verticalAlign, 
    fontSize, 
    fontFamily
  };
};

// ! TODO - missing some styles
export const getBlockStyle = (cellStyles) => {
  if(cellStyles === undefined) return undefined;
  
  const {
    fill,
    horizontalAlignment
  } = cellStyles;

  return {
    fill,
    horizontalAlignment
  };
};

const extractRichTextData = (richText) => {
  let plainRichTextObject = [];

  const richTextLength = richText.length;

  for(let fragmentIndex = 0; fragmentIndex < richTextLength; fragmentIndex++) {
    const fragment = richText.get(fragmentIndex);

    const styles = extractCellRichTextStyle(fragment);
    const text = fragment.value();

    plainRichTextObject.push({ styles, text });
  }

  return plainRichTextObject;
};

const extractCellData = (cellData) => {
  const cellValue = cellData.value();

  const cellFormula = cellData.formula();
  
  // !! TODO May be internal - ie in another sheet
  const cellHyperlinkData = cellData.hyperlink();

  if(cellHyperlinkData) {
    const { _sheet, _data } = cellHyperlinkData;

    // Internal
    if(_sheet) {
      const [ y, x ] = _data;
      // External -- Potentially unsafe
      // ! unsure when this undefined value occurs... what is the value of the cell?
      if(cellValue === undefined) {
        // console.log(_sheet, _data)
      }
    } else {
      // console.log(cellValue)
    }
  }

  let extractedCellData = {};

  if(cellValue !== undefined) {
    if(cellValue instanceof RichText) {
      extractedCellData.type = "rich-text";
      extractedCellData.value = extractRichTextData(cellValue);
    } else if(cellFormula) {
      const { _error } = cellValue;
      
      extractedCellData.value = _error ? _error : cellValue;
      extractedCellData.type = "formula";
      extractedCellData.formula = cellFormula;
    } else {
      extractedCellData.type = "normal";
      // ! Big assumption: object means error
      extractedCellData.value = typeof cellValue === "object" ? cellValue._error : cellValue;
    }
  }

  const cellStyles = extractCellStyle(cellData);
 if(cellStyles) extractedCellData.styles = cellStyles;

  return isObjectEmpty(extractedCellData) ? undefined : extractedCellData;
};

export const getSheetCellData = (sheet, columnCount, rowCount) => {
  let sheetCellData = {};

  for(let row = 0; row < rowCount; row++) {
    for(let column = 0; column < columnCount; column++) {
      if(row && column) {
        const cellData = extractCellData(sheet.row(row).cell(column));

        if(cellData) {
          if(!sheetCellData[row]) sheetCellData[row] = {};

          sheetCellData[row][column] = cellData;
        }
      } 
    }
  }

  return sheetCellData;
};

export const getSheetFreezeHeader = (sheet) => {
  const freezeHeader = {};
  
  const panes = sheet.panes();
          
  if(panes && panes.state === "frozen") {
    freezeHeader.sheetFreezeRowCount = panes.ySplit;
    freezeHeader.sheetFreezeColumnCount = panes.xSplit;
  } else {
    freezeHeader.sheetFreezeRowCount = DEFAULT_EXCEL_SHEET_FREEZE_ROW_COUNT;
    freezeHeader.sheetFreezeColumnCount = DEFAULT_EXCEL_SHEET_FREEZE_COLUMN_COUNT; 
  }

  return freezeHeader;
};

export const convertRichTextToEditorState = (richText, editorState = EditorState.createEmpty()) => {
  richText.forEach(({ styles, text }) => {
    if(styles) editorState = RichUtils.toggleInlineStyle(editorState, styles);
    
    editorState = EditorState.push(
      editorState,
      ContentState.createFromText(text ? text.toString() : ""),
      "change-inline-style"
    );
  })
  
  return EditorState.moveFocusToEnd(editorState);
};

export const convertTextToEditorState = (text) => {
  if(text !== undefined && typeof text !== "string") text = text.toString();

  return (
    EditorState.moveFocusToEnd((
      text 
        ? EditorState.createWithContent(ContentState.createFromText(text)) 
        : EditorState.createWithContent(ContentState.createFromText(""))
    ))
  );
};

export const getTopOffsets = (rowHeights, rowCount) => {
  let topOffsetsTotal = DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER;
  let topOffsets = [ 0, DEFAULT_EXCEL_SHEET_ROW_HEIGHT_HEADER ];

  for(let row = 2; row < rowCount; row++) {
    let rowHeight = getNormalRowHeight(rowHeights[row - 1]);

    topOffsetsTotal += rowHeight;
    topOffsets.push(topOffsetsTotal);
  }

  return topOffsets;
};

export const getLeftOffsets = (columnWidths, columnCount) => {
  let leftOffsetTotal = DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER;
  let leftOffsets = [ 0, DEFAULT_EXCEL_SHEET_COLUMN_WIDTH_HEADER ];

  for(let column = 2; column < columnCount; column++) {
    let columnWidth = getNormalColumnWidth(columnWidths[column - 1]);

    leftOffsetTotal += columnWidth;
    leftOffsets.push(leftOffsetTotal);
  }

  return leftOffsets;
};

export const getActiveCellInputData = (sheetCellData, activeRow, activeColumn) => {
  const activeCellInputValueData = (
    sheetCellData && sheetCellData[activeRow] && sheetCellData[activeRow][activeColumn] !== undefined
      ? sheetCellData[activeRow][activeColumn]
      : undefined
  );
  
  return (
    activeCellInputValueData && activeCellInputValueData.type === "rich-text"
      ? { editorState: convertRichTextToEditorState(activeCellInputValueData.value) }
      : { editorState: convertTextToEditorState(activeCellInputValueData ? activeCellInputValueData.value : undefined) }
  );
};

const getMaxSheetRange = (sheetCellData) => {
  let maxColumnRange = DEFAULT_EXCEL_SHEET_COLUMN_COUNT + 1;
  let maxRowRange = DEFAULT_EXCEL_SHEET_ROW_COUNT + 1;

  for(let row in sheetCellData) {
    const rowNumber = parseInt(row);
    if(rowNumber + 1 > maxRowRange) maxRowRange = rowNumber + 1;

    let columns = sheetCellData[row];

    for(let column in columns) {
      const columnNumber = parseInt(column);
      if(columnNumber + 1 > maxColumnRange) {
        maxColumnRange = columnNumber + 1;
      }
    }
  }

  return { maxRowRange, maxColumnRange };
};

export const createBlankSheet = () => {
  const activeCellPosition = { x: 1, y: 1 };
  const sheetTemplateIdMapping = DEFAULT_SHEET_TEMPLATE_ID_MAPPING;
  const sheetCellData = {};
  const sheetColumnCount = DEFAULT_EXCEL_SHEET_COLUMN_COUNT + 1;
  const sheetRowCount = DEFAULT_EXCEL_SHEET_ROW_COUNT + 1;
  const sheetColumnWidths = {};
  const sheetRowHeights = {};
  const sheetFreezeColumnCount = 0;
  const sheetFreezeRowCount = 0;
  const sheetHiddenColumns = {};
  const sheetHiddenRows = {};

  return {
    activeCellPosition,
    sheetTemplateIdMapping,
    sheetCellData,
    sheetColumnCount,
    sheetColumnWidths,
    sheetFreezeColumnCount,
    sheetRowCount,
    sheetFreezeRowCount,
    sheetRowHeights,
    sheetHiddenColumns,
    sheetHiddenRows
  };
};

export const createBlankReactState = () => {
  const name = uniqid();

  const sheetName = "Sheet1";

  const sheetContent = createBlankSheet();

  const workbookData = { [ sheetName ]: pako.deflate(JSON.stringify(sheetContent), { to: "string" }) };

  const sheetNames = [ sheetName ];
  const activeSheetName = sheetName;

  return {
    name,
    workbookData,
    activeSheetName,
    sheetNames
  };
};

export const convertExcelFileToState = async (excelFile) => {
  const WorkbookInstance = await XlsxPopulate.fromDataAsync(excelFile);
  const name = excelFile.name;
          
  const sheetNames = WorkbookInstance.sheets().map((sheet) => sheet.name());

  const activeSheet = WorkbookInstance.activeSheet();
  const activeSheetName = activeSheet.name();

  let workbookData = {};
  sheetNames.forEach((name) => {
    const sheet = WorkbookInstance.sheet(name);

    let { sheetColumnCount, sheetRowCount } = getSheetHeaderCount(sheet);

    const sheetCellData = getSheetCellData(sheet, sheetColumnCount, sheetRowCount);

    // Make sure to set about enough column/rows for the used cells
    const { maxColumnRange, maxRowRange } = getMaxSheetRange(sheetCellData);

    sheetColumnCount = maxColumnRange;
    sheetRowCount = maxRowRange;

    const { sheetColumnWidths, sheetHiddenColumns } = getSheetColumnsData(sheet, sheetColumnCount);
    const { sheetRowHeights, sheetHiddenRows } = getSheetRowsData(sheet, sheetRowCount);
    const { sheetFreezeRowCount, sheetFreezeColumnCount } = getSheetFreezeHeader(sheet);

    let activeRow;
    let activeColumn;

    // Hot-fix for saved multi-selection (not implemeneted in xlsx-populate)
    try {
      let activeCell = sheet.activeCell();
    
      if(activeCell instanceof Range) {
        activeRow = activeCell._minRowNumber;
        activeColumn = activeCell._minColumnNumber;
      } else {
        activeRow = activeCell.rowNumber();
        activeColumn = activeCell.columnNumber();
      }

      if(activeColumn > sheetColumnCount) activeColumn = sheetColumnCount - 1;
      if(activeRow > sheetRowCount) activeRow = sheetRowCount - 1; 
    } catch(error) {
      activeRow = 1;
      activeColumn = 1;
    }

    let activeCellPosition = { x: activeColumn, y: activeRow };
    const sheetTemplateIdMapping = DEFAULT_SHEET_TEMPLATE_ID_MAPPING;

    const sheetContent = {
      activeCellPosition,
      sheetTemplateIdMapping,
      sheetCellData,
      sheetColumnCount,
      sheetColumnWidths,
      sheetFreezeColumnCount,
      sheetRowCount,
      sheetFreezeRowCount,
      sheetRowHeights,
      sheetHiddenColumns,
      sheetHiddenRows
    };

    workbookData[name] = pako.deflate(JSON.stringify(sheetContent), { to: "string" });
  });

  return {
    name,
    workbookData,
    activeSheetName,
    sheetNames
  };
};

export const convertStateToReactState = (state) => {
  
  const workbookData = state.workbookData;
  const activeSheetName = state.activeSheetName;
  const activeSheetData = JSON.parse(pako.inflate(workbookData[activeSheetName], { to: "string" }));
  const { activeCellPosition: { x, y } } = activeSheetData;

  const activeCellInputData = getActiveCellInputData(activeSheetData.sheetCellData, y, x);

  let inactiveSheetsData = JSON.stringify({ ...workbookData, [activeSheetName]: undefined });

  sessionStorage.setItem("inactiveSheets", inactiveSheetsData);

  return {
    ...state,
    ...activeSheetData,
    activeCellInputData,
    workbookData: undefined
  };
};

export const getWorkbookData = (activeSheetName, activeSheetData) => {
  const inactiveSheetsData = sessionStorage.getItem("inactiveSheets");
  
  const rawInactiveSheetsData = JSON.parse(inactiveSheetsData);

  return { ...rawInactiveSheetsData, [activeSheetName]: pako.deflate(JSON.stringify(activeSheetData), { to: "string" }) };
};

export const extractReactAndWorkbookState = (state) => {
  const {
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
    stagnantSelectionAreas,
    sheetTemplateIdMapping,
  } = state;

  const workbookData = getWorkbookData(activeSheetName, {
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
    stagnantSelectionAreas,
    sheetTemplateIdMapping
  });

  return {
    name,
    activeSheetName,
    sheetNames,
    workbookData
  };
};

export const getCellDataText = (cellData) => {
  if(!cellData) return "";

  let { type, value } = cellData;

  let text;

  if(type === "rich-text") {
    text = value.reduce((resultText, { text }) => resultText + text);
  } else {
    text = value !== undefined ? value : "";
  }

  return text;
};

export const clearEditorStateText = (richText) => convertRichTextToEditorState(richText.length ? richText[0] : []);
