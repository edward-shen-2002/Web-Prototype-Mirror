import { useEffect } from "react";

const WindowListener = ({ eventListenerRef }) => {
  useEffect(() => {
    window.onmouseup = (event) => {
      const { ctrlKey } = event;
      eventListenerRef.current.mouseUp(ctrlKey);
    };

    // ! Handle scroll when outside sheet grid
    window.onmousemove = ({ clientX, clientY }) => {
      
    };

    return () => {
      window.onmouseup = null;
    };
  })

  return null;
};

export default WindowListener;