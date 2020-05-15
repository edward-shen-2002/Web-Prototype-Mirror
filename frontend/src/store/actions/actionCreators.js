/**
 * App state: data that is specific to the application's behavior
 */

// Activity
export const SET_OFFLINE = "SET_OFFLINE";
export const SET_ONLINE = "SET_ONLINE";

// Reconnection
export const ENABLE_RECONNECTION = "ENABLE_RECONNECTION";
export const DISABLE_RECONNECTION = "DISABLE_RECONNECTION";

/**
 * Domain data: data that the application needs to show, use, or modify
 */

export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const RESET_ACCOUNT = "RESET_ACCOUNT";

// Dialog Store
export const OPEN_COA_GROUP_DIALOG = "OPEN_COA_GROUP_DIALOG"
export const CLOSE_COA_GROUP_DIALOG = "CLOSE_COA_GROUP_DIALOG"
export const OPEN_COA_DIALOG = "OPEN_COA_DIALOG"
export const CLOSE_COA_DIALOG = "CLOSE_COA_DIALOG"

// COA Group store
export const FAIL_COA_GROUPS_REQUEST = "FAIL_COA_GROUPS_REQUEST"
export const RECEIVE_COA_GROUPS = "RECEIVE_COA_GROUPS"
export const REQUEST_COA_GROUPS = "REQUEST_COA_GROUPS"
export const CREATE_COA_GROUP = "CREATE_COA_GROUP"
export const DELETE_COA_GROUP = "DELETE_COA_GROUP"
export const UPDATE_COA_GROUP = "UPDATE_COA_GROUP"
export const RESET_COA_GROUPS = "RESET_COA_GROUPS"

// Sheet Name store
export const FAIL_SHEETNAMES_REQUEST = "FAIL_SHEETNAMES_REQUEST"
export const RECEIVE_SHEETNAMES = "RECEIVE_SHEETNAMES"
export const REQUEST_SHEETNAMES = "REQUEST_SHEETNAMES"
export const CREATE_SHEETNAME = "CREATE_SHEETNAME"
export const DELETE_SHEETNAME = "DELETE_SHEETNAME"
export const UPDATE_SHEETNAME = "UPDATE_SHEETNAME"

// COA Store
export const FAIL_COAS_REQUEST = "FAIL_COAS_REQUEST"
export const RECEIVE_COAS = "RECEIVE_COAS"
export const REQUEST_COAS = "REQUEST_COAS"
export const CREATE_COA = "CREATE_COA"
export const DELETE_COA = "DELETE_COA"
export const UPDATE_COA = "UPDATE_COA"
export const RESET_COAS = "RESET_COAS"

// COA Tree UI Store
export const UPDATE_SELECTED_NODE_COA_TREE_UI = "UPDATE_SELECTED_NODE_COA_TREE_UI"
export const UPDATE_ORIGINAL_COA_TREE_UI = "UPDATE_ORIGINAL_COA_TREE_UI"
export const LOAD_COA_TREE_UI = "LOAD_COA_TREE_UI"
export const UPDATE_LOCAL_COA_TREE_UI = "UPDATE_LOCAL_COA_TREE_UI"
export const REVERT_COA_TREE_UI = "REVERT_COA_TREE_UI"
export const ADD_ROOT_COA_TREE_UI = "ADD_ROOT_COA_TREE_UI"
export const DELETE_COA_TREE_UI = "DELETE_COA_TREE_UI"
export const SELECT_COA_COA_TREE_UI = "SELECT_COA_COA_TREE_UI"

// COA Tree Store
export const FAIL_COA_TREES_REQUEST = "FAIL_COA_TREES_REQUEST";
export const RECEIVE_COA_TREES = "RECEIVE_COA_TREES";
export const REQUEST_COA_TREES = "REQUEST_COA_TREES";
export const CREATE_COA_TREE = "CREATE_COA_TREE";
export const DELETE_COA_TREE = "DELETE_COA_TREE";
export const UPDATE_COA_TREE = "UPDATE_COA_TREE";
export const RESET_COA_TREES = "RESET_COA_TREES";

// Templates Store
export const FAIL_TEMPLATES_REQUEST = "FAIL_TEMPLATES_REQUEST";
export const RECEIVE_TEMPLATES = "RECEIVE_TEMPLATES";
export const REQUEST_TEMPLATES = "REQUEST_TEMPLATES";
export const CREATE_TEMPLATE = "CREATE_TEMPLATE";
export const DELETE_TEMPLATE = "DELETE_TEMPLATE";
export const UPDATE_TEMPLATE = "UPDATE_TEMPLATE";
export const RESET_TEMPLATES = "RESET_TEMPLATES";

// Template Packages Store
export const FAIL_TEMPLATE_PACKAGES_REQUEST = "FAIL_TEMPLATE_PACKAGES_REQUEST";
export const RECEIVE_TEMPLATE_PACKAGES = "RECEIVE_TEMPLATE_PACKAGES";
export const REQUEST_TEMPLATE_PACKAGES = "REQUEST_TEMPLATE_PACKAGES";
export const CREATE_TEMPLATE_PACKAGE = "CREATE_TEMPLATE_PACKAGE";
export const DELETE_TEMPLATE_PACKAGE = "DELETE_TEMPLATE_PACKAGE";
export const UPDATE_TEMPLATE_PACKAGE = "UPDATE_TEMPLATE_PACKAGE";
export const RESET_TEMPLATE_PACKAGES = "RESET_TEMPLATE_PACKAGES";

// Template Types Store
export const FAIL_TEMPLATE_TYPES_REQUEST = "FAIL_TEMPLATE_TYPES_REQUEST";
export const RECEIVE_TEMPLATE_TYPES = "RECEIVE_TEMPLATE_TYPES";
export const REQUEST_TEMPLATE_TYPES = "REQUEST_TEMPLATE_TYPES";
export const CREATE_TEMPLATE_TYPE = "CREATE_TEMPLATE_TYPE";
export const DELETE_TEMPLATE_TYPE = "DELETE_TEMPLATE_TYPE";
export const UPDATE_TEMPLATE_TYPE = "UPDATE_TEMPLATE_TYPE";
export const RESET_TEMPLATE_TYPES = "RESET_TEMPLATE_TYPES";

// Statuses Store
export const FAIL_STATUSES_REQUEST = "FAIL_STATUSES_REQUEST";
export const RECEIVE_STATUSES = "RECEIVE_STATUSES";
export const REQUEST_STATUSES = "REQUEST_STATUSES";
export const CREATE_STATUS = "CREATE_STATUS";
export const DELETE_STATUS = "DELETE_STATUS";
export const UPDATE_STATUS = "UPDATE_STATUS";
export const RESET_STATUSES = "RESET_STATUSES";

// AppSys Store
export const FAIL_APPSYSES_REQUEST = "FAIL_APPSYSES_REQUEST"
export const RECEIVE_APPSYSES = "RECEIVE_APPSYSES"
export const REQUEST_APPSYSES = "REQUEST_APPSYSES"
export const CREATE_APPSYS = "CREATE_APPSYS"
export const DELETE_APPSYS = "DELETE_APPSYS"
export const UPDATE_APPSYS = "UPDATE_APPSYS"
export const RESET_APPSYSES = "RESET_APPSYSES"

/**
 * UI data: data related to the views/components display state
 */
export const SHOW_APP_NAVIGATION = "SHOW_APP_NAVIGATION";
export const HIDE_APP_NAVIGATION = "HIDE_APP_NAVIGATION";

// ! EXCEL
export const EXCEL_ARROW_DOWN = "EXCEL_ARROW_DOWN";
export const EXCEL_ARROW_LEFT = "EXCEL_ARROW_LEFT";
export const EXCEL_ARROW_RIGHT = "EXCEL_ARROW_RIGHT";
export const EXCEL_ARROW_UP = "EXCEL_ARROW_UP";

export const EXCEL_DELETE = "EXCEL_DELETE";
export const EXCEL_ENTER = "EXCEL_ENTER";

export const EXCEL_DELETE_CELLS_SHIFT_LEFT = "EXCEL_DELETE_CELLS_SHIFT_LEFT";
export const EXCEL_DELETE_CELLS_SHIFT_UP = "EXCEL_DELETE_CELLS_SHIFT_UP";
export const EXCEL_DOUBLE_CLICK_EDITABLE_CELL = "EXCEL_DOUBLE_CLICK_EDITABLE_CELL";
export const EXCEL_RESIZE_COLUMN_START = "EXCEL_RESIZE_COLUMN_START";
export const EXCEL_RESIZE_ROW_START = "EXCEL_RESIZE_ROW_START";
export const EXCEL_ENABLE_EDIT_MODE = "EXCEL_ENABLE_EDIT_MODE";
export const EXCEL_DISABLE_EDIT_MODE = "EXCEL_DISABLE_EDIT_MODE";
export const EXCEL_ESCAPE = "EXCEL_ESCAPE";

export const EXCEL_INSERT_COLUMN = "EXCEL_INSERT_COLUMN";
export const EXCEL_INSERT_ROW = "EXCEL_INSERT_ROW";

export const EXCEL_MOUSE_DOWN = "EXCEL_MOUSE_DOWN";

export const EXCEL_SELECT_OVER = "EXCEL_SELECT_OVER";

export const EXCEL_RIGHT_CLICK_CELL = "EXCEL_RIGHT_CLICK_CELL";
export const EXCEL_SELECT_ALL = "EXCEL_SELECT_ALL";
export const EXCEL_SELECT_COLUMN = "EXCEL_SELECT_COLUMN";
export const EXCEL_SELECT_ROW = "EXCEL_SELECT_ROW";
export const EXCEL_SET_BLOCK_STYLE = "EXCEL_SET_BLOCK_STYLE";

export const EXCEL_SET_BUSINESS_CONCEPT = "EXCEL_SET_BUSINESS_CONCEPT";
export const EXCEL_SET_GROUPS = "EXCEL_SET_GROUPS";
export const EXCEL_SET_PREPOPULATE = "EXCEL_SET_PREPOPULATE";

export const EXCEL_SET_SCROLL_DATA = "EXCEL_SET_SCROLL_DATA";
export const EXCEL_SET_SHEET_NAME = "EXCEL_SET_SHEET_NAME";
export const EXCEL_SET_SHEET = "EXCEL_SET_SHEET";
export const EXCEL_TAB = "EXCEL_TAB";

export const EXCEL_SET_EXCEL_DATA = "EXCEL_SET_EXCEL_DATA";
export const EXCEL_RESET_EXCEL_DATA = "EXCEL_RESET_EXCEL_DATA";

export const EXCEL_SET_NAME = "EXCEL_SET_NAME";

export const EXCEL_TOGGLE_TEMPLATE_PUBLISH = "EXCEL_TOGGLE_TEMPLATE_PUBLISH";

export const EXCEL_SET_ACTIVE_CELL_DIALOG = "EXCEL_SET_ACTIVE_CELL_DIALOG";
export const EXCEL_RESET_ACTIVE_CELL_DIALOG = "EXCEL_RESET_ACTIVE_CELL_DIALOG";

export const EXCEL_SET_ACTIVE_CELL_INPUT_VALUE = "EXCEL_SET_ACTIVE_CELL_INPUT_VALUE";

export const EXCEL_SET_READ_ONLY = "EXCEL_SET_READ_ONLY";
export const EXCEL_UNSET_READ_ONLY = "EXCEL_UNSET_READ_ONLY";

export const EXCEL_DOWNLOAD = "EXCEL_DOWNLOAD";
export const EXCEL_SAVE = "EXCEL_SAVE";

export const EXCEL_ADD_COMMENT = "EXCEL_ADD_COMMENT";
export const EXCEL_DELETE_COMMENT = "EXCEL_DELETE_COMMENT";

export const EXCEL_ENABLE_SHEET_FOCUS = "EXCEL_ENABLE_SHEET_FOCUS";

export const EXCEL_MERGE_CELLS = "EXCEL_MERGE_CELLS";
export const EXCEL_UNMERGE_CELLS = "EXCEL_UNMERGE_CELLS";

export const EXCEL_RESIZE_ROW = "EXCEL_RESIZE_ROW";
export const EXCEL_RESIZE_COLUMN = "EXCEL_RESIZE_COLUMN";

export const EXCEL_SELECT_END = "EXCEL_SELECT_END";

export const EXCEL_RESIZE_ROW_END = "EXCEL_RESIZE_ROW_END";
export const EXCEL_RESIZE_COLUMN_END = "EXCEL_RESIZE_COLUMN_END";
