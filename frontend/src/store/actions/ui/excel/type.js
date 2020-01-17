import {
  UPDATE_EXCEL_TYPE,
  RESET_EXCEL_TYPE
} from "@actionCreators";

export const updateExcelType = (excelType) => ({ type: UPDATE_EXCEL_TYPE, excelType });
export const resetExcelType = () => ({ type: RESET_EXCEL_TYPE });
