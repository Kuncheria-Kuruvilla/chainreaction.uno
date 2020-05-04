import React from 'react';
import { useSelector } from 'react-redux';

const withGameLogic = (WrappedComponent) => ({
  cellState,
  cellClickHandler,
  ...passThroughProps
}) => {
  const currentPlayer = useSelector((state) =>
    state.players.find((player) => player.active === true)
  );
  const possedPlayer = useSelector((state) =>
    state.players.find((player) => player._id === cellState?.playerId)
  );

  return (
    <WrappedComponent
      currentPlayer={currentPlayer}
      possedPlayer={possedPlayer}
      handleCellStateChange={cellClickHandler}
      cellState={cellState}
      {...passThroughProps}
    />
  );
};
export default withGameLogic;
