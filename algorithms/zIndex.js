// ! Consider frozen - complicated
/**
 * IDEAS
 * 
 * Get width of last frozen column with value (not width of column)
 * 
 * Parse the value and get the values not shown on the frozen column
 * 
 * Put it as a parameter in the first non-frozen column (not as a value!) if it doesn't have a value
 */
const getRowsZIndex = (rows, rowCount, columnCount) => {
  let rowsZIndexList = [];

  for(let row = 0; row < rowCount; row++) {
    let rowZIndex = 2;
    let rowZIndexList = [];
    for(let column = 0; column < columnCount; column++) {
      if(rows[row] !== undefined && rows[row][column] !== undefined) {
        rowZIndexList.push(++rowZIndex);
      } else {
        rowZIndexList.push(rowZIndex - 1);
      }
    }

    rowsZIndexList.push(rowZIndexList);
  }

  return rowsZIndexList;
};
