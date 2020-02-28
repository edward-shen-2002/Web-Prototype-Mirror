import XlsxPopulate, { RichText, Range, FormulaError } from "xlsx-populate";

import { sheetNameRegex } from "./regex";

import { EditorState, ContentState, RichUtils } from "draft-js";

import { isObjectEmpty } from "@tools/misc";

import pako from "pako";

import Color from "color";

import { themes } from "@constants/styles";

import { Parser } from "hot-formula-parser";

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
} from "@constants/excel";

import uniqid from "uniqid";

var parser = new Parser();

const groupRegex = /[a-z]+[1-9][0-9]*:[a-z]+[1-9][0-9]*/gi;
const invidualRegex = /[a-z]+[1-9][0-9]*/gi;

const convertColumnToNumber = (column) => {
  column = column.toUpperCase();

  let sum = 0;

  const columnCharCount = column.length;

  const initialColumnCode = "A".charCodeAt(0);

  for(let i = 0; i < columnCharCount; i++) {
    sum  *= 26;
    sum += column.charCodeAt(i) - initialColumnCode + 1;
  }

  return sum;
};

const convertNumberToColumn = (number) => {
  var temp, letter = "";
  while (number > 0) {
    temp = (number - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    number = (number - temp - 1) / 26;
  }

  return letter;
};

const getCellLocationFromString = (string) => {
  const rowIndex = string.search(/\d/);
  
  const row = string.substring(rowIndex, string.length);
  const column = string.substring(0, rowIndex);

  return [ column, row ];
};

const getColumnRange = (start, end) => {
  let startNumber = convertColumnToNumber(start);
  let endNumber = convertColumnToNumber(end);
  if(startNumber > endNumber) throw "Start must be less than or equal to end";
  
  let range = (new Array(endNumber - startNumber + 1)).fill(null).map((_val, index) => startNumber + index);

  return range;
};

const getRowRange = (start, end) => {
  if(start > end) throw "Start must be less than or equal to end";
  start = +start;
  end = +end;

  let range = [];
  for(let i = start; i <= end; i++) range.push(i);

  return range;
};

const getGroupFormula = (data, formula) => {
  const matches = formula.match(groupRegex);
  if(!matches) return formula;

  matches.forEach((group) => {
    const [ start, end ] = group.split(":");
    const [ startColumn, startRow] = getCellLocationFromString(start);
    const [ endColumn, endRow ] = getCellLocationFromString(end);

    // Get all letters from start to end
    const columnRange = getColumnRange(startColumn, endColumn);
    const rowRange = getRowRange(startRow, endRow);

    const columnCount = columnRange.length;
    const rowCount = rowRange.length;
    let wholeRange = [];

    for(let j = 0; j < rowCount; j++) {
      const row = rowRange[j];
      const rowData = data[row];

      for(let i = 0; i < columnCount; i++) {
        const column = columnRange[i];

        if(rowData === undefined || rowData[column] === undefined || rowData[column].value === undefined) {
          wholeRange.push(undefined);
        } else {          
          const { value } = rowData[column];
  
          // ! Value/Formulas cannot be richtext
          wholeRange.push(value);
        }
      }
    }

    const rangeStrings = wholeRange.join();
    formula = formula.replace(group, rangeStrings);
  });

  return formula;
};

const getIndividualFormula = (data, formula) => {
  const matches = formula.match(invidualRegex);
  if(!matches) return formula;

  matches.forEach((individual) => {
    let [ column, row ] = getCellLocationFromString(individual);

    const rowData = data[row];

    column = convertColumnToNumber(column);

    if(rowData === undefined || rowData[column] === undefined || rowData[column].value === undefined) {
      formula = formula.replace(individual, "undefined");
    } else {
      const { value } = rowData[column];

      formula = formula.replace(individual, value);
    }
  });

  return formula;
};

const calculateFormula = (data, formula) => {  
  formula = getGroupFormula(data, formula);
  formula = getIndividualFormula(data, formula);

  return parser.parse(formula);
};

export const getScrollbarSize = (() => {
  let size = -1;

  return (recalculate = false) => {
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
})();

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

export const isPrepopulateString = (string) => string && string.charAt(0) === "|";

export const parsePrepopulateString = (string) => (
  string.substring(1)
    .split("&")
    .reduce((acc, parameter) => {
      const [ group, value ] = parameter.split("=");

      if(group && value) {
        try {
          acc[group] = JSON.parse(value);
        } catch(error) {
          acc[group] = value;
        }
      }

      return acc;
    }, {})
);

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

const extractCellData = (cellData, row, column) => {
  let extractedCellData = {};
  
  const value = cellData.value();

  const formula = cellData.formula();
  
  // !! TODO May be internal - ie in another sheet
  const hyperlinkData = cellData.hyperlink();

  const merged = cellData.merged();

  if(merged) {
    const { _data: [ y1, x1, y2, x2 ] } = merged;

    extractedCellData.merged = { x1, y1, x2, y2 };
  }

  if(hyperlinkData) {
    const { 
      hyperlink,
      _sheet, 
      _data 
    } = hyperlinkData;

    extractedCellData.hyperlink = {};

    // Internal - Could it be from another workbook?
    if(_sheet) {
      const [ y, x ] = _data;

      extractedCellData.hyperlink.type = "internal";
      extractedCellData.hyperlink.sheet = _sheet;
      extractedCellData.hyperlink.cell = { x, y };
    // External -- Potentially unsafe
    } else {
      extractedCellData.hyperlink.type = "external";
      extractedCellData.hyperlink.link = hyperlink;
    }
  }

  // TODO : Add error field in cellData!!
  if(value !== undefined) {
    if(value instanceof RichText) {
      extractedCellData.type = "rich-text";
      extractedCellData.value = extractRichTextData(value);
    } else {
      if(formula) {
        extractedCellData.type = "formula";
        extractedCellData.formula = formula;
      } else if(typeof value === "string" && isPrepopulateString(value)) {
        extractedCellData.type = "prepopulate";
      } else {
        extractedCellData.type = "normal";
      }

      // ! possibly more conditions but not discovered yet
      extractedCellData.value = value instanceof FormulaError ? value._error : value;
    }
  }

  const cellStyles = extractCellStyle(cellData);
 if(cellStyles) extractedCellData.styles = cellStyles;

  return isObjectEmpty(extractedCellData) ? undefined : extractedCellData;
};

export const getSheetCellData = (sheet, columnCount, rowCount) => {
  let sheetCellData = {};

  for(let row = 1; row < rowCount; row++) {
    const rowData = sheet.row(row);
    for(let column = 1; column < columnCount; column++) {
      const cellData = extractCellData(rowData.cell(column), row, column);

      if(cellData) {
        if(!sheetCellData[row]) sheetCellData[row] = {};

        sheetCellData[row][column] = cellData;
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

    const sheetContent = {
      activeCellPosition,
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

export const getWorkbookData = (activeSheetName, activeSheetData, inactiveSheets) => {
  const workbookData = {};

  Object.keys(inactiveSheets)
    .filter((sheetName) => sheetName !== activeSheetName)
    .forEach((sheetName) => {
      workbookData[sheetName] =  pako.deflate(JSON.stringify(inactiveSheets[sheetName]), { to: "string" });
    });
  
  workbookData[activeSheetName] = pako.deflate(JSON.stringify(activeSheetData), { to: "string" });

  return workbookData;
};

export const extractReactAndWorkbookState = (state, inactiveSheets) => {
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
  }, inactiveSheets);

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
    text = value === undefined ? "" : value;
  }

  return text;
};

export const clearEditorStateText = (richText) => convertRichTextToEditorState(richText.length ? richText[0] : []);

export const getAreaDimensions = ({
  x1, y1, x2, y2,
  topOffsets,
  leftOffsets,
  sheetColumnWidths,
  sheetRowHeights
}) => {
  const height = topOffsets[y2] + getNormalRowHeight(sheetRowHeights[y2]) - topOffsets[y1];
  const width = leftOffsets[x2] + getNormalColumnWidth(sheetColumnWidths[x2]) - leftOffsets[x1];

  return { height, width };
}