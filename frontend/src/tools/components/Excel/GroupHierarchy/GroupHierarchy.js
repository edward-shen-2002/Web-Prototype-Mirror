import React from "react";

import { useSelector, shallowEqual } from "react-redux";

import SortableTree from "react-sor"

const GroupHierarchy = ({
  eventListenerRef
}) => {
  const { sheetCellData } = useSelector(
    ({ 
      ui: {
        excel: {
          sheetCellData
        }
      } 
    }) => ({
      sheetCellData
    }),
    shallowEqual
  );

  return (
    <div>

    </div>
  );
};

export default GroupHierarchy;