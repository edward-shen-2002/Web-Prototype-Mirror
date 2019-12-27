import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import Loading from "tools/components/Loading";

const mapStateToProps = ({
  ui: {
    isAppNavigationOpen
  }
}) => ({
  isAppNavigationOpen
});

const mapDispatchToProps = (dispatch) => ({
  handleLoadWorkbook: (bundleId, workbookId) => {
    
  }
});

let Workbook = ({
  match: {
    params: {
      phase, 
      bundleId, 
      workbookId 
    } 
  },
  handleLoadWorkbook
}) => {
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      // Set Excel Redux states
      handleLoadWorkbook(bundleId, workbookId);
      // setIsDataFetched(true);
    }
  });

  return (
    isDataFetched 
      ? <Excel 
          name={name} 
          returnLink={`${ROUTE_USER_BUNDLES}/${phase}/${bundleId}`}
          type={phase}
        />
      : <Loading/>
  );
};

Workbook = connect(mapStateToProps, mapDispatchToProps)(Workbook);

export default Workbook;