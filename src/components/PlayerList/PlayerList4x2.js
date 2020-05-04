import React from 'react';
import PlayerList from './PlayerList';

const PlayerList4x2 = () => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: 'auto auto auto auto',
  };
  return <PlayerList gridStyle={gridStyle} />;
};
export default PlayerList4x2;
