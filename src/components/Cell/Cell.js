import React from "react";
import "./Cell.css";

const Cell = ({ children, cellClickHandler }) => {
  const cellStyle = {
    border: "1px solid red"
  };
  return (
    <div className="cell" style={cellStyle} onClick={cellClickHandler}>
      <div className="ball-wrapper">{children}</div>
    </div>
  );
};

export default Cell;
