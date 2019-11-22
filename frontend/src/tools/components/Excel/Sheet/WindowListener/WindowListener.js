import React, { Fragment } from "react";

const WindowListener = ({ eventListenerRef }) => {
  window.onmouseup = (event) => {
    const { ctrlKey } = event;
    eventListenerRef.current.mouseUp(ctrlKey);
  };

  return null;
};

export default WindowListener;