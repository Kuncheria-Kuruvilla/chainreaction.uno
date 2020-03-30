import React from "react";
import "./GameBoard.css";

import RegularCell from "../Cell/RegularCell";
import BorderCell from "../Cell/BorderCell";
import CornerCell from "../Cell/CornerCell";
import { clickCell, setGrid } from "../../actions/gridActions";
import { activatePlayer, disablePlayer } from "../../actions/playersAction";
import { getAdjacentCellCoordinates } from "../../game_logic/utils";
import { useSelector, useDispatch } from "react-redux";

const GameBoard = () => {
  const grid = useSelector(state => state.grid);
  const players = useSelector(state => state.players);
  const dispatch = useDispatch();

  const gameStateRegistry = [];
  const startChainReaction = (i, j, currentPlayerId) => {
    if (gameStateRegistry.length <= 0) {
      gameStateRegistry.push(grid);
    }
    if (
      gameStateRegistry.length > 0 &&
      (gameStateRegistry[gameStateRegistry.length - 1][i][j].activeBalls ===
        0 ||
        gameStateRegistry[gameStateRegistry.length - 1][i][j]?.activeBalls <
          gameStateRegistry[gameStateRegistry.length - 1][i][j].cellCapacity)
    ) {
      console.log("Cell ", i, "-", j + " clicked");
      let newGrid =
        gameStateRegistry.length > 0
          ? gameStateRegistry[gameStateRegistry.length - 1].map((row, iter) =>
              row.map(({ activeBalls, playerId, ...rest }, jter) => {
                return iter === i && jter === j
                  ? {
                      activeBalls: activeBalls + 1,
                      playerId: currentPlayerId,
                      ...rest
                    }
                  : { activeBalls, playerId, ...rest };
              })
            )
          : grid.map((row, iter) =>
              row.map(({ activeBalls, playerId, ...rest }, jter) => {
                return iter === i && jter === j
                  ? {
                      activeBalls: activeBalls + 1,
                      playerId: currentPlayerId,
                      ...rest
                    }
                  : { activeBalls, playerId, ...rest };
              })
            );
      gameStateRegistry.push(newGrid);
    } else {
      console.log("Cell ", i, "-", j + " blown!!");
      let newGrid =
        gameStateRegistry.length > 0
          ? gameStateRegistry[gameStateRegistry.length - 1].map((row, iter) =>
              row.map(({ activeBalls, playerId, ...rest }, jter) => {
                return iter === i && jter === j
                  ? {
                      activeBalls: 0,
                      ...rest
                    }
                  : { activeBalls, playerId, ...rest };
              })
            )
          : grid.map((row, iter) =>
              row.map(({ activeBalls, playerId, ...rest }, jter) => {
                return iter === i && jter === j
                  ? {
                      activeBalls: 0,
                      ...rest
                    }
                  : { activeBalls, playerId, ...rest };
              })
            );
      gameStateRegistry.push(newGrid);
      const nextCoordinates = getAdjacentCellCoordinates(
        i,
        j,
        grid.length,
        grid[0]?.length
      );
      nextCoordinates.forEach(coordinate => {
        startChainReaction(coordinate.x, coordinate.y, currentPlayerId);
      });
    }
  };

  const handleCellClick = (i, j) => () => {
    debugger;
    const currentPlayer = players.find(player => player?.active === true);
    const nextPlayer = players.find(
      player => player?.turn === (currentPlayer?.turn + 1) % players.length
    );
    if (
      grid[i][j]?.playerId === undefined ||
      grid[i][j].playerId === currentPlayer._id
    ) {
      if (
        grid[i][j].activeBalls === 0 ||
        grid[i][j]?.activeBalls < grid[i][j].cellCapacity
      )
        dispatch(clickCell(i, j, currentPlayer._id));
      else {
        startChainReaction(i, j, currentPlayer._id);
      }
      if (gameStateRegistry.length > 0) {
        dispatch(setGrid(gameStateRegistry[gameStateRegistry.length - 1]));
      }
      dispatch(disablePlayer(currentPlayer?._id));
      dispatch(activatePlayer(nextPlayer?._id));
    }
  };

  return (
    <div className="game-grid">
      <table>
        <tbody>
          {grid.map((row, i) => {
            return (
              <tr key={`game-board-row-${i}`}>
                {row.map((column, j) => (
                  <td key={`game-board-column-${j}`}>
                    {[0, grid.length - 1].includes(i) &&
                    [0, row.length - 1].includes(j) ? (
                      <CornerCell
                        cellState={grid[i][j]}
                        cellClickHandler={handleCellClick(i, j)}
                      ></CornerCell>
                    ) : [0, grid.length - 1].includes(i) ||
                      [0, row.length - 1].includes(j) ? (
                      <BorderCell
                        cellState={grid[i][j]}
                        cellClickHandler={handleCellClick(i, j)}
                      ></BorderCell>
                    ) : (
                      <RegularCell
                        cellState={grid[i][j]}
                        cellClickHandler={handleCellClick(i, j)}
                      ></RegularCell>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default GameBoard;
