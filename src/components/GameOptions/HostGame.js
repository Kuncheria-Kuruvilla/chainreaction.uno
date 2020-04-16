import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer, fetchAllPlayers } from '../../actions/playersAction';
import {
  hostGameAction,
  fetchGame,
  startGameAction,
} from '../../actions/gameActions';
import { initGrid, fetchGrid } from '../../actions/gridActions';
import PlayerList4x2 from '../PlayerList/PlayerList4x2';
import './HostGame.css';
import { PLAYERNAMES } from '../../game_logic/constants';

const HostGame = () => {
  const [isHosted, setisHosted] = useState(false);
  const [rows, setrows] = useState(6);
  const [colums, setcolums] = useState(10);
  const [nickname, setnickname] = useState(
    PLAYERNAMES[Math.floor(Math.random() * PLAYERNAMES.length)]
  );
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
              autoFocus
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
      <p className="text-center">Share code with your friends</p>
      <p className="text-center ps-font-x-large red-shadow">{gameCode}</p>
      <PlayerList4x2 />
      <div className="start-gmae-btn-container">
        <button
          onClick={startGame}
          className="btn red-border-btn"
          disabled={players.length < 2}
          align="center"
        >
          Start Game
        </button>
      </div>
    </React.Fragment>
  );
};
export default HostGame;
