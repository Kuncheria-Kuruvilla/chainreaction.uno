import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPlayer, fetchAllPlayers } from '../../actions/playersAction';
import {
  hostGameAction,
  fetchGame,
  startGameAction,
} from '../../actions/gameActions';
import { initGrid, fetchGrid } from '../../actions/gridActions';
import PlayerList4x2 from '../PlayerList/PlayerList4x2';

const HostGame = ({ onGameHosted }) => {
  const [isHosted, setisHosted] = useState(false);
  const [rows, setrows] = useState(6);
  const [colums, setcolums] = useState(10);
  const [nickname, setnickname] = useState(
    'guest' + Math.floor(Math.random() * 1001)
  );
  const [gameCode, setGameCode] = useState();

  const dispatch = useDispatch();

  const hostGame = () => {
    setisHosted(true);
    dispatch(hostGameAction())
      .then((gameIdentifier) => {
        sessionStorage.setItem('playgroundId', gameIdentifier.playgroundId);
        setGameCode(gameIdentifier.code);
        onGameHosted();
        return Promise.resolve(gameIdentifier.playgroundId);
      })
      .then((playgroundId) => dispatch(addPlayer(playgroundId, nickname, true)))
      .then((playerId) => {
        sessionStorage.setItem('playerId', playerId);
      })
      .then(() => dispatch(initGrid(rows, colums)))
      .then(() => {
        dispatch(fetchAllPlayers());
        dispatch(fetchGame());
        dispatch(fetchGrid());
      });
  };
  const startGame = () => {
    dispatch(startGameAction());
  };

  return !isHosted ? (
    <table>
      <tbody>
        <tr>
          <td>
            <label htmlFor="nickname">Nickname</label>
          </td>
          <td>
            <input
              type="text"
              id="nickname"
              className="inpt red-border-inpt"
              value={nickname}
              onChange={(e) => setnickname(e.target.value)}
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
              className="inpt red-border-inpt"
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
              className="inpt red-border-inpt"
              onChange={(e) => setcolums(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2} align="center">
            <button onClick={hostGame} className="btn red-border-btn">
              Host Game
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  ) : (
    <React.Fragment>
      <p>{gameCode}</p>
      <PlayerList4x2 />
      <button onClick={startGame} className="btn red-border-btn">
        Start Game
      </button>
    </React.Fragment>
  );
};
export default HostGame;
