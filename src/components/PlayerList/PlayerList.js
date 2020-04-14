import React from 'react';
import { useSelector } from 'react-redux';

import './PlayerList.css';
const PlayerList = ({ gridStyle }) => {
  const players = useSelector((state) => state.players);
  const ballStyle = (color) => ({
    background: `radial-gradient(circle at 30% 30%, ${color}, black)`,
  });
  return (
    <div className="player-lisr-container" style={gridStyle}>
      {players.map((player, i) => (
        <div key={i} className="player-details-grid">
          <figure
            className="player_color_indicator"
            style={ballStyle(player.color)}
          />
          <p className="nickname ps-font-small">{player.nickname}</p>
        </div>
      ))}
    </div>
  );
};
export default PlayerList;
