// ! Does not update the state
// ! Performance optimization. If this were used in sheet, it will listen to too many events?

import { downloadWorkbook } from '../../../../../tools/excel';

const DOWNLOAD = state => {
  const { name, activeSheetName, inactiveSheets } = state;

  const sheets = {
    ...inactiveSheets,
    [activeSheetName]: state,
  };

  downloadWorkbook(name, activeSheetName, sheets);

  return state;
};

export default DOWNLOAD;
