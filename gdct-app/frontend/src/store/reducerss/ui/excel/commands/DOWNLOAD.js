// ! Does not update the state
// ! Performance optimization. If this were used in sheet, it will listen to too many events?

import { downloadWorkbook } from '../../../../../tools/excel'

const DOWNLOAD = (state) => {
  const { name, activeSheetName, inactiveSheets } = state

  console.log(name)
  console.log(activeSheetName)
  console.log(inactiveSheets)
  const sheets = {
    ...inactiveSheets,
    [activeSheetName]: state,
  }

  console.log(sheets)

  downloadWorkbook(name, activeSheetName, sheets)

  return state
}

export default DOWNLOAD
