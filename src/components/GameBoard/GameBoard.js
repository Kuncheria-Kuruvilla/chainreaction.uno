import React, { useState } from "react";

import "./GameBoard.css";

import RegularCell from "../Cell/RegularCell";
import BorderCell from "../Cell/BorderCell";
import CornerCell from "../Cell/CornerCell";

const GameBoard = ({ numberOfRows, numberOfColumns }) => {
  let plyers = [
    { _id: 100, nickName: "John wick", colour: "red", alive: true },
    { _id: 101, nickName: "Death Stroke", colour: "green", alive: true }
  ];

  const [grid, setGrid] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);
  const handleCellClick = (i, j) => () => {
    let tempGrid = grid;
    if (tempGrid[i][j]) {
      tempGrid[i][j].activeBalls++;
    } else {
      tempGrid[i][j] = { activeBalls: 1 };
    }
    setGrid([...tempGrid]);
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
