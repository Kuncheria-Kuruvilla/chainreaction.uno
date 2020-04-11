import React, { useState } from 'react';
import HostGame from './HostGame';
import JoinGame from './JoinGame';
const GameOptions = () => {
  const [playerOption, setplayerOption] = useState();

  return (
    <React.Fragment>
      {playerOption === 'host_game' ? (
        <HostGame></HostGame>
      ) : playerOption === 'join_game' ? (
        <JoinGame></JoinGame>
      ) : (
        <React.Fragment>
          <button onClick={() => setplayerOption('host_game')}>
            Host Game
          </button>
          <button onClick={() => setplayerOption('join_game')}>
            Join Game
          </button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default GameOptions;
