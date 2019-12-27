import React, { useEffect } from "react";

import { connect } from "react-redux";

const mapStateToProps = ({
  ui: {
    isAppNavigationOpen
  }
}) => ({
  isAppNavigationOpen
});

const mapDispatchToProps = (dispatch) => ({
  handleLoadWorkbook: (_id) => {
    
  }
});

let WorkbookEdit = ({
  match: { params: { _id } },
  handleLoadWorkbook
}) => {
  const [ isDataFetched, setIsDataFetched ] = useState(false);

  useEffect(() => {
    if(!isDataFetched) {
      // Set Excel Redux states
      handleLoadWorkbook(_id);
      setIsDataFetched(true);
    }
  });

  return (
    isDataFetched 
      ? <Excel 
          name={name} 
          returnLink={`${ROUTE_USER_BUNDLES}/edit/${_id}`} 
          handleUpdateTemplate={handleUpdateTemplate}
        />
      : <Loading/>
  );
};

WorkbookEdit = connect(mapStateToProps, mapDispatchToProps)(WorkbookEdit);

export default WorkbookEdit;