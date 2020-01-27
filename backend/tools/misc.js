export const isObjectEmpty = (object) => {
  for(let key in object) {
    if(object.hasOwnProperty(key)) return false;
  }

  return true;
};

export const stringContainsSpace = (string) => /\s/g.test(string);

export const isValidMongooseObjectId = (stringId) => /^[a-fA-F0-9]{24}$/.test(stringId);

export const getListDifference = (focusedList, unfocusedList) => (
  focusedList.filter((element) => !unfocusedList.includes(element))
    .concat(unfocusedList.filter((element) => !focusedList.includes(element)))
);

export const isNumber = (value) => +value === +value;