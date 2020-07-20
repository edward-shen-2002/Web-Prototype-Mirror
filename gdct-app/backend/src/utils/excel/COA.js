
import pako from 'pako'

const getCellData = (
  sheetData,
  rowIndex, 
  columnIndex
) => sheetData[rowIndex] ? sheetData[rowIndex][columnIndex] : undefined

/**
 * Maps column with `Column` - which represents the column header  
 */
export const extractColumnNameIds = (sheetData) => {
  const columns = {}
  const firstRow = sheetData[1]

  if(firstRow) {
    for(let column in firstRow) {
      const columnNumber = +column

      if(columnNumber > 1) {
        const categoryData = getCellData(sheetData, 1, columnNumber)

        if(categoryData && categoryData.value) {
          columns[column] = categoryData.value
        }
      }
    }
  }

  return columns
}

/**
 * Maps rows with COA data 
 */
export const extractCOAData = (sheetData) => {
  const COAs = {}

  for(let row in sheetData) {
    const rowNumber = +row

    if(rowNumber > 1) {
      const COAIdData = getCellData(sheetData, rowNumber, 1)
      const COATreeIdData = getCellData(sheetData, rowNumber, 2)

      // ? Could be possible that COATreeId is not needed, ie no grouping
      if(COAIdData && COAIdData.value) { 
        COAs[row] = {
          COAId: COAIdData.value,
          COATreeId: COATreeIdData ? COATreeIdData.value : undefined
        }
      }
    }
  }

  return COAs
}

export const extractCOAColumnPairs = (sheetData) => {
  const masterValueGroups = []
  
  const columnIds = extractColumnNameIds(sheetData)
  const COAIds = extractCOAData(sheetData)

  for(let row in COAIds) {
    for(let column in columnIds) {
      const cellData = getCellData(sheetData, +row, +column)

      if(!masterValueGroups[row]) masterValueGroups[row] = {}
      masterValueGroups[row][column] = cellData.value

      masterValueGroups.push(
        {
          columnId: columnIds[column],
          ...COAIds[row]
        }
      )
    }
  }

  return masterValueGroups
}

export const extractWorkbookMasterValues = (workbookData, submissionId) => {
  const masterValues = []

  for(let sheetName in workbookData.workbookData) {
    
    const sheetData = JSON.parse(pako.inflate(workbookData.workbookData[sheetName], { to: "string" })).sheetCellData;
  
    const columns = extractColumnNameIds(sheetData)
    const COAs = extractCOAData(sheetData)
  
    for(let row in COAs) {
      for(let column in columns) {
        const cellData = getCellData(sheetData, +row, +column)
        
        masterValues.push(
          {
            submissionId,
            columnNameId: columns[column],
            ...COAs[row],
            value: cellData ? cellData.value : undefined
          }
        )
      }
    }
  }

  return masterValues
}