import React, { useState, useEffect } from 'react';
import usePrevious from '../../hooks/usePrevious';
import './Cell.css';
import BallState from '../../game_logic/ball_state';

const Cell = ({ children, color, cellClickHandler }) => {
  const [cellClasses, setcellClasses] = useState('cell');
  const [rotationSpeed, setrotationSpeed] = useState('');
  const cellStyle = {
    border: `1px solid ${color}`,
  };

  let ballStateArray = children.length
    ? children.map((child) => child.props.state)
    : [children.props.state];
  const previousBallState = usePrevious(ballStateArray);

  useEffect(() => {
    const ballStatesChanged = () => {
      return (
        (
          previousBallState &&
          ballStateArray.filter((state, i) => state !== previousBallState[i])
        )?.length > 0
      );
    };
    if (ballStatesChanged()) {
      setcellClasses('cell cell-animate');
      setTimeout(() => setcellClasses('cell'), 1200);
    }
  }, [previousBallState, ballStateArray]);

  useEffect(() => {
    setrotationSpeed(
      ballStateArray.filter((state) => state === BallState.ACTIVE).length >= 3
        ? ' rotate-3x '
        : ballStateArray.filter((state) => state === BallState.ACTIVE).length >=
          2
        ? ' rotate-2x '
        : ' rotate-1x '
    );
  }, [ballStateArray]);

  return (
    <div className={cellClasses} style={cellStyle} onClick={cellClickHandler}>
      <div className={`ball-wrapper ${rotationSpeed}`}>{children}</div>
    </div>
  );
};

export default Cell;
