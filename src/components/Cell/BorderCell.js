import React from "react";
import Cell from "./Cell";
import Ball from "../Ball/Ball";
import BallState from "../../game_logic/ball_state";
import withGameLogic from "./withGameLogic";

const CELL_CAPACITY = 2
const BorderCell = ({ cellState, currentPlayer, possedPlayer, handleCellClick}) => {
  const ballStyle1 = {
    top: "-5px",
    left: "3px"
  };
  const ballStyle2 = {
    top: "10px",
    left: "12px"
  };

  return (
    <Cell cellClickHandler={handleCellClick} color = {currentPlayer?.color}>
      <Ball
        color={possedPlayer?.color}
        alignment={ballStyle1}
        state={
          cellState?.activeBalls >= 1 ? BallState.ACTIVE : BallState.DISABLED
        }
      ></Ball>
      <Ball
        color={possedPlayer?.color}
        alignment={ballStyle2}
        state={
          cellState?.activeBalls >= 2 ? BallState.ACTIVE : BallState.DISABLED
        }
      ></Ball>
    </Cell>
  );
};

export default withGameLogic(BorderCell,CELL_CAPACITY);
