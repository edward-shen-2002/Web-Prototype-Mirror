import { createEmptyEditor, createEmptyEditorValue } from '../../../../../tools/slate';

const RESET_EXCEL_DATA = () => ({
  name: '',
  type: '',
  activeCellInputData: {
    cellEditor: createEmptyEditor(),
    formulaEditor: createEmptyEditor(),
    cellValue: createEmptyEditorValue(),
    formulaValue: createEmptyEditorValue(),
  },
  activeCellDialog: null,
  activeSheetName: 'Sheet1',
  activeSelectionArea: null,
  activeCellPosition: { x: 1, y: 1 },
  activeCellSelectionAreaIndex: -1,
  isSheetFocused: true,
  rowResizeData: null,
  columnResizeData: null,
  freezeRowResizeData: null,
  freezeColumnResizeData: null,
  stagnantSelectionAreas: [],
  selectedRows: {},
  selectedColumns: {},
  sheetNames: [],
  scrollData: {
    horizontalScrollDirection: 'forward',
    scrollLeft: 0,
    scrollTop: 0,
    scrollUpdateWasRequested: false,
    verticalScrollDirection: 'forward',
  },
  cursorType: 'default',

  isSelectionMode: false,
  isEditMode: false,
  isColumnResizeMode: false,
  isFreezeColumnResizeMode: false,
  isRowResizeMode: false,
  isFreezeRowResizeMode: false,
  sheetCellData: {},
  sheetColumnCount: {},
  sheetColumnWidths: {},
  sheetFreezeColumnCount: 0,
  sheetRowCount: {},
  sheetRowHeights: {},
  sheetFreezeRowCount: 0,
  sheetHiddenColumns: {},
  sheetHiddenRows: {},

  inactiveSheets: {},

  contextMenuData: { isOpen: false, anchorPosition: null },
  isTemplatePublished: false,
  templateId: '',
  bundleId: '',
});

export default RESET_EXCEL_DATA;
