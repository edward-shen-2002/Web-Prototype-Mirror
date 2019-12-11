import { useEffect } from "react";

const WindowListener = ({ eventListenerRef, sheetContainerRef }) => {
  useEffect(() => {
    const { current: EventListenerInstance } = eventListenerRef;

    window.onmouseup = (event) => {
      const { ctrlKey } = event;
      EventListenerInstance.mouseUp(ctrlKey);
    };

    // ! Handle scroll when outside sheet grid
    window.onmousemove = ({ clientX, clientY }) => {
      EventListenerInstance.mouseMove(sheetContainerRef, clientX, clientY);
    };

    return () => {
      window.onmouseup = null;
    };
  })

  return null;
};

export default WindowListener;