import React from 'react';
import { useSelector } from 'react-redux';

import './PlayerList.css';
import { Container } from 'react-bootstrap';
const PlayerList = ({ gridStyle }) => {
  const players = useSelector((state) => state.players);
  const ballStyle = (color) => ({
    background: `radial-gradient(circle at 30% 30%, ${color}, black)`,
  });

  const borderStyle = (color) => ({
    borderStyle: 'solid',
    borderColor: color,
    borderWidth: 'thin',
  });
  return (
    <Container>
      <div className="player-lisr-container" style={gridStyle}>
        {players.map((player, i) => (
          <div
            key={i}
            className="player-details-grid"
            style={player.active ? borderStyle(player.color) : null}
          >
            <figure
              className={`player_color_indicator ${
                !player.live && `dead-player-ball`
              }`}
              style={ballStyle(player.color)}
            />
            <p
              className={`nickname ps-font-small ${
                !player.live && `dead-player-name`
              }`}
            >
              {`${player.nickname}${!player.live ? `(offline)` : ``}`}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
};
export default PlayerList;
