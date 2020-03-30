import React, { useCallback } from "react";
import { useSelector } from "react-redux";

const witthGameLogic = WrappedComponent => ({
  cellState,
  cellClickHandler,
  blowCell,
  ...passThroughProps
}) => {
  const currentPlayer = useSelector(state =>
    state.players.find(player => player.active === true)
  );
  const possedPlayer = useSelector(state =>
    state.players.find(player => player._id === cellState?.playerId)
  );

  const memoizedCellStateHandler = useCallback(() => {
    cellClickHandler();
  }, [cellClickHandler]);

  return (
    <WrappedComponent
      currentPlayer={currentPlayer}
      possedPlayer={possedPlayer}
      handleCellStateChange={memoizedCellStateHandler}
      cellState={cellState}
      {...passThroughProps}
    />
  );
};
export default witthGameLogic;
