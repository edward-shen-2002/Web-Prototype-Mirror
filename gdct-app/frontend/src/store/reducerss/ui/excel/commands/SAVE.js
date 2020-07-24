// ! Does not update the state
// ! Performance optimization. If this were used in sheet, it will listen to too many events?

const SAVE = (state, { handleSave }) => {
  // Consider type of workbook then route properly
  handleSave(state);
  return state;
};

export default SAVE;
