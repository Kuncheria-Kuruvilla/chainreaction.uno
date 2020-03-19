import React from "react";
import Cell from "./Cell";
import Ball from "../Ball/Ball";
import BallState from "../../game_logic/ball_state";
const CornerCell = ({ cellState, cellClickHandler }) => {
  const ballStyle1 = {
    top: "5px",
    left: "3px"
  };
  return (
    <Cell cellClickHandler={cellClickHandler}>
      <Ball
        color="red"
        alignment={ballStyle1}
        state={
          cellState?.activeBalls >= 1 ? BallState.ACTIVE : BallState.DISABLED
        }
      ></Ball>
    </Cell>
  );
};

export default CornerCell;
