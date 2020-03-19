import React from "react";
import BallState from "../../game_logic/ball_state";

import "./Ball.css";
const Ball = ({ color, alignment, state }) => {
  const displayState = {
    [BallState.DEAD]: "none",
    [BallState.DISABLED]: "none",
    [BallState.ACTIVE]: "block"
  };
  const ballStyle = {
    ...alignment,
    display: displayState[state] ? displayState[state] : "none",
    background: `radial-gradient(circle at 30% 30%, ${color}, black)`
  };
  return <figure className="ball" style={ballStyle} />;
};

export default Ball;
