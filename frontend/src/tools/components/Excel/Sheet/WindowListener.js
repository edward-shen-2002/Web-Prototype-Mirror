import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { mouseUp } from "@actions/ui/excel/mouse";

const WindowListener = ({ sheetContainerRef, sheetGridRef }) => {
  const dispatch = useDispatch();

  const handleMouseUp = useCallback(
    (ctrlKey) => dispatch(mouseUp({ ctrlKey, resetAfterRowIndex: sheetGridRef.current.resetAfterRowIndex })),
    [ dispatch ]
  );

  useEffect(() => {
    window.onmouseup = ({ ctrlKey }) => handleMouseUp(ctrlKey);

    // ! Handle scroll when outside sheet grid
    window.onmousemove = ({ clientX, clientY }) => {
      // eventListenerRef.current.mouseMove(sheetContainerRef, clientX, clientY);
    };

    return () => {
      window.onmouseup = null;
      window.onmousemove = null;
    };
  })

  return null;
};

export default WindowListener;