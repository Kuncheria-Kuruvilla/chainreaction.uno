import React from 'react';
import PlayerList from './PlayerList';

const PlayerList2x4 = () => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto',
    gridTemplateRows: 'auto auto',
  };
  return <PlayerList gridStyle={gridStyle} />;
};
export default PlayerList2x4;
