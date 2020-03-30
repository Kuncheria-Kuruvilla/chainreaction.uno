export const initGrid = (numberOfRows, numberOfColumns) => ({
  type: "INIT_GRID",
  nRows: numberOfRows,
  nColumns: numberOfColumns
});

export const resetGrid = () => ({
  type: "RESET_GRID"
});

export const setGrid = newGrid => ({
  type: "SET_GRID",
  newGrid
});

export const clickCell = (x, y, playerId) => ({
  type: "CLICK_CELL",
  x,
  y,
  playerId
});

export const blowCell = (x, y) => ({
  type: "BLOW_CELL",
  x,
  y
});
