import React from "react";
import { connect } from "react-redux";
import "./GameBoard.css";

import RegularCell from "../Cell/RegularCell";
import BorderCell from "../Cell/BorderCell";
import CornerCell from "../Cell/CornerCell";
import { clickCell } from "../../actions/gridActions"
import { activatePlayer, disablePlayer } from "../../actions/playersAction"

const mapStateToProps = ({ grid, players }) => ({
  grid,
  players
})

const GameBoard = ({ grid, players, dispatch }) => {
  const handleCellClick = (i, j) => () => {
    const currentPlayer = players.find(player => player?.active === true)
    const nextPlayer = players.find(player => player?.turn === (currentPlayer?.turn + 1) % players.length)
    if (grid[i][j] === null || grid[i][j].playerId === currentPlayer._id) {
      dispatch(clickCell(i, j, currentPlayer._id))
      dispatch(disablePlayer(currentPlayer?._id));
      dispatch(activatePlayer(nextPlayer?._id))
    }
  };
  const handleBlowCell = (i, j) => () => {
    const currentPlayer = players.find(player => player?.active === true)
    if (grid[i][j] === null || grid[i][j].playerId === currentPlayer._id) {
      console.log(`Cell ${i} - ${j} BLOWS !!`)
    }
  }
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
                          blowCell={handleBlowCell(i, j)}
                        ></CornerCell>
                      ) : [0, grid.length - 1].includes(i) ||
                        [0, row.length - 1].includes(j) ? (
                          <BorderCell
                            cellState={grid[i][j]}
                            cellClickHandler={handleCellClick(i, j)}
                            blowCell={handleBlowCell(i, j)}
                          ></BorderCell>
                        ) : (
                          <RegularCell
                            cellState={grid[i][j]}
                            cellClickHandler={handleCellClick(i, j)}
                            blowCell={handleBlowCell(i, j)}
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
export default connect(mapStateToProps)(GameBoard);
