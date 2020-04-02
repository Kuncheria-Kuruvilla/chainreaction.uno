import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { initGrid, resetGrid } from "../../actions/gridActions";
import { addPlayer, activatePlayer, reviveAllPlayers } from "../../actions/playersAction";
import { startGame as startGameAction } from "../../actions/gameActions";

function GameOptions() {
  const [activeGame, setactiveGame] = useState(false);
  const [rows, setrows] = useState(6);
  const [colums, setcolums] = useState(10);
  const players = useSelector(state => state.players);
  const dispatch = useDispatch();

  const startGame = () => {
    setactiveGame(true);
    let plyerNames = ["John wick", "Slade Wilson", "Wilson fisk"];
    plyerNames.map(player => dispatch(addPlayer(player)));
    const playerWithFirstTurn = players?.find(player => player.turn === 0);
    dispatch(activatePlayer(playerWithFirstTurn?._id));
    dispatch(initGrid(rows, colums));
    dispatch(startGameAction())
  };
  const resetGame = () => {
    const playerWithFirstTurn = players.find(player => player.turn === 0);
    dispatch(reviveAllPlayers())
    dispatch(activatePlayer(playerWithFirstTurn?._id));
    dispatch(resetGrid());
    dispatch(startGameAction())
  };

  return (
    <table>
      <tbody>
        {!activeGame ? (
          <React.Fragment>
            <tr>
              <td>
                <label htmlFor="number-of-rows">Rows</label>
              </td>
              <td>
                <input
                  type="number"
                  id="number-of-rows"
                  value={rows}
                  onChange={e => setrows(e.target.value)}
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
                  onChange={e => setcolums(e.target.value)}
                />
              </td>
            </tr>
          </React.Fragment>
        ) : null}
        <tr>
          <td>
            {!activeGame ? (
              <button onClick={startGame}>Start Game</button>
            ) : (
                <button onClick={resetGame}>Reset Game</button>
              )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default GameOptions;
