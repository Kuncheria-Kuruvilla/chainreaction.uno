import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { joinGameAction, fetchGame } from '../../actions/gameActions';
import { fetchAllPlayers, addPlayer } from '../../actions/playersAction';
import { fetchGrid } from '../../actions/gridActions';
import PlayerList4x2 from '../PlayerList/PlayerList4x2';

const JoinGame = () => {
  const [isJoined, setisJoined] = useState(false);
  const [gameCode, setgameCode] = useState('');
  const [nickname, setnickname] = useState(
    `Guest${[Math.floor(Math.random() * 9999)]}`
  );

  const dispatch = useDispatch();

  const joinGame = () => {
    dispatch(joinGameAction(gameCode))
      .then((playgroundId) => Promise.resolve(playgroundId))
      .then((playgroundId) =>
        dispatch(addPlayer(playgroundId, nickname)).then((playerId) =>
          Promise.resolve({ playgroundId, playerId })
        )
      )
      .then(({ playgroundId, playerId }) => {
        sessionStorage.setItem('playgroundId', playgroundId);
        sessionStorage.setItem('playerId', playerId);
        dispatch(fetchAllPlayers());
        dispatch(fetchGame());
        dispatch(fetchGrid());
        setisJoined(true);
      })
      .catch((error) => console.log(error));
  };
  return !isJoined ? (
    <table>
      <tbody>
        <tr>
          <td>
            <label htmlFor="game-code">Code</label>
          </td>
          <td>
            <input
              autoFocus
              type="text"
              id="game-code"
              value={gameCode}
              className="inpt red-border-inpt"
              onChange={(e) => setgameCode(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="nickname">Nickname</label>
          </td>
          <td>
            <input
              type="text"
              id="nickname"
              value={nickname}
              className="inpt red-border-inpt"
              onChange={(e) => setnickname(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2} align="center">
            <button onClick={joinGame} className="btn red-border-btn">
              Join Game
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  ) : (
    <React.Fragment>
      <p>Waiting for host to start the game ...</p>
      <PlayerList4x2 />
    </React.Fragment>
  );
};

export default JoinGame;
