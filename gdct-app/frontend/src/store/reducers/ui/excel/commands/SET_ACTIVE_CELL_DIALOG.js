const SET_ACTIVE_CELL_DIALOG = (state, { dialog, category }) => ({
  ...state,
  activeCellDialog: {
    dialog,
    category,
  },
});

export default SET_ACTIVE_CELL_DIALOG;
