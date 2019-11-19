import { sheetNameRegex } from "./regex";

export const generateNewSheetName = (sheetNames) => {
  let uniqueSheetNumber = sheetNames.length + 1;

  sheetNames.forEach((name) => {
    const match = name.match(sheetNameRegex);

    if(match && uniqueSheetNumber <= match[1]) uniqueSheetNumber++;
  });

  return `Sheet${uniqueSheetNumber}`;
};