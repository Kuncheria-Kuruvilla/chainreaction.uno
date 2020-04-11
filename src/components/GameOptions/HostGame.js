import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPlayer, fetchAllPlayers } from '../../actions/playersAction';
import {
  hostGameAction,
  fetchGame,
  startGameAction,
} from '../../actions/gameActions';
import { initGrid, fetchGrid } from '../../actions/gridActions';

const HostGame = () => {
  const [isHosted, setisHosted] = useState(false);
  const [rows, setrows] = useState(6);
  const [colums, setcolums] = useState(10);
  const [nickname, setnickname] = useState(
    'guest' + Math.floor(Math.random() * 1001)
  );
  const [color, setcolor] = useState('');
  const [gameCode, setGameCode] = useState();

  const players = useSelector((state) => state.players);
  const dispatch = useDispatch();

  const hostGame = () => {
    setisHosted(true);
    dispatch(hostGameAction())
      .then((gameIdentifier) => {
        sessionStorage.setItem('playgroundId', gameIdentifier.playgroundId);
        setGameCode(gameIdentifier.code);
        return Promise.resolve(gameIdentifier.playgroundId);
      })
      .then((playgroundId) =>
        dispatch(addPlayer(playgroundId, nickname, color, true))
      )
      .then((playerId) => {
        sessionStorage.setItem('playerId', playerId);
      })
      .then(() => dispatch(initGrid(rows, colums)))
      .then(() => {
        dispatch(fetchAllPlayers());
        dispatch(fetchGame());
      });
  };
  const startGame = () => {
    dispatch(startGameAction());
    dispatch(fetchGrid());
  };

  return (
    <table>
      <tbody>
        {!isHosted ? (
          <React.Fragment>
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
                <label htmlFor="number-of-rows">Rows</label>
              </td>
              <td>
                <input
                  type="number"
                  id="number-of-rows"
                  value={rows}
                  onChange={(e) => setrows(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="number-of-coloumns">Columns</label>
              </td>
              <td>
                <input
                  type="number"
                  id="number-of-coloumns"
                  value={colums}
                  onChange={(e) => setcolums(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={hostGame}>Host Game</button>
              </td>
            </tr>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <tr>
              <td>{gameCode}</td>
            </tr>
            {players.map((player, i) => (
              <tr key={i}>
                <td>{player.nickname}</td>
                <td>{player.color}</td>
              </tr>
            ))}
            <tr>
              <td>
                <button onClick={startGame}>Start Game</button>
              </td>
            </tr>
          </React.Fragment>
        )}
      </tbody>
    </table>
  );
};
export default HostGame;
