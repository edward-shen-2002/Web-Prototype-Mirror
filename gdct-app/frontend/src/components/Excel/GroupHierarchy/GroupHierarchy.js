import React from 'react';

import { useSelector, shallowEqual } from 'react-redux';

import SortableTree from 'react-sor';

const GroupHierarchy = () => {
  const { sheetCellData } = useSelector(
    ({
      ui: {
        excel: {
          present: { sheetCellData },
        },
      },
    }) => ({
      sheetCellData,
    }),
    shallowEqual,
  );

  return <div></div>;
};

export default GroupHierarchy;
