import React, { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { selectAll } from '../../../../store/actions/ui/excel/commands';

// Contains draggable borders for freeze row/columns
const RootHeaderCell = ({ style }) => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => dispatch(selectAll()), [dispatch]);

  return <div className="cell cell--positionIndicator" style={style} onClick={handleClick} />;
};

export default RootHeaderCell;
