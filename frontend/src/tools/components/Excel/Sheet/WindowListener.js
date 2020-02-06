import { useEffect } from "react";

const WindowListener = ({ eventListenerRef, sheetContainerRef }) => {
  useEffect(() => {
    window.onmouseup = (event) => {
      const { ctrlKey } = event;
      eventListenerRef.current.mouseUp(ctrlKey);
    };

    // ! Handle scroll when outside sheet grid
    window.onmousemove = ({ clientX, clientY }) => {
      eventListenerRef.current.mouseMove(sheetContainerRef, clientX, clientY);
    };

    return () => {
      window.onmouseup = null;
    };
  })

  return null;
};

export default WindowListener;