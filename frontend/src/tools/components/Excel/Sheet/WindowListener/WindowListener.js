import React, { Fragment } from "react";

const WindowListener = ({ eventListenerRef }) => {
  window.onmouseup = () => {
    eventListenerRef.current.mouseUp();
  };

  return null;
};

export default WindowListener;