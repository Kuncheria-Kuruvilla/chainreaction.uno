import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { joinGameAction, fetchGame } from '../../actions/gameActions';
import { fetchAllPlayers, addPlayer } from '../../actions/playersAction';
import { fetchGrid } from '../../actions/gridActions';

const JoinGame = () => {
  const [isJoined, setisJoined] = useState(false);
  const [gameCode, setgameCode] = useState('');
  const [nickname, setnickname] = useState(
    'guest' + Math.floor(Math.random() * 1001)
  );
  const [color, setcolor] = useState('');

  const players = useSelector((state) => state.players);
  const dispatch = useDispatch();

  const joinGame = () => {
    dispatch(joinGameAction(gameCode, nickname, color))
      .then((playgroundId) => Promise.resolve(playgroundId))
      .then((playgroundId) =>
        dispatch(addPlayer(playgroundId, nickname, color)).then((playerId) =>
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
  return (
    <table>
      <tbody>
        {!isJoined ? (
          <React.Fragment>
            <tr>
              <td>
                <label htmlFor="game-code">Code</label>
              </td>
              <td>
                <input
                  type="text"
                  id="game-code"
                  value={gameCode}
                  onChange={(e) => setgameCode(e.target.value)}
                ></input>
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
                  onChange={(e) => setnickname(e.target.value)}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="color">Color</label>
              </td>
              <td>
                <input
                  type="text"
                  id="color"
                  value={color}
                  onChange={(e) => setcolor(e.target.value)}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={joinGame}>Join Game</button>
              </td>
            </tr>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {players.map((player, i) => (
              <tr key={i}>
                <td>{player.nickname}</td>
                <td>{player.color}</td>
              </tr>
            ))}
          </React.Fragment>
        )}
      </tbody>
    </table>
  );
};

export default JoinGame;
