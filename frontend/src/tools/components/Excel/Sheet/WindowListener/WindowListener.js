import { useEffect } from "react";

const WindowListener = ({ eventListenerRef }) => {
  useEffect(() => {
    window.onmouseup = (event) => {
      const { ctrlKey } = event;
      eventListenerRef.current.mouseUp(ctrlKey);
    };

    return () => {
      window.onmouseup = null;
    };
  })

  return null;
};

export default WindowListener;