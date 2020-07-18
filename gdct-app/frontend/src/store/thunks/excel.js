const saveFile = handleSave => (dispatch, getState) => {
  dispatch(saveExcelRequest());

  const { ExcelStore } = getState();

  return handleSave(ExcelStore)
    .then(() => {
      dispatch(finishSaveExcel());
    })
    .catch(error => {
      dispatch(failSaveExcel(error));
    });
};
