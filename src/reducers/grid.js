const CORNER_CELL_CAPACITY = 1;
const BORDER_CELL_CAPACITY = 2;
const REGULAR_CELL_CAPACITY = 3;
const getCellCapacity = (i, j, nRows, nCols) => {
  return [0, nRows - 1].includes(i) && [0, nCols - 1].includes(j)
    ? CORNER_CELL_CAPACITY
    : [0, nRows - 1].includes(i) || [0, nCols - 1].includes(j)
      ? BORDER_CELL_CAPACITY
      : REGULAR_CELL_CAPACITY;
};

const initGrid = (state, { nRows, nColumns }) => {
  let newGrid = [];
  for (let i = 0; i < nRows; i++) {
    let col = [];
    for (let j = 0; j < nColumns; j++) {
      col.push({
        activeBalls: 0,
        cellCapacity: getCellCapacity(i, j, nRows, nColumns)
      });
    }
    newGrid.push(col);
  }
  return newGrid;
};

const resetGrid = grid => grid.map((row, i) => row.map((col, j) => {
  return {
    activeBalls: 0,
    cellCapacity: getCellCapacity(i, j, grid.length, row.length)
  }
}));

const setGrid = (grid, { newGrid }) =>
  newGrid?.map(row => row.map(col => col));

const clickCell = (grid, { x, y, playerId }) =>
  grid.map((row, i) =>
    row.map((col, j) =>
      x === i && y === j
        ? {
          ...col,
          activeBalls: col?.activeBalls ? ++col.activeBalls : 1,
          playerId
        }
        : col
    )
  );

const blowCell = (grid, { x, y }) =>
  grid.map((row, i) =>
    row.map((col, j) =>
      x === i && y === j
        ? ({ playerId, ...rest }) => ({ activeBalls: 0, ...rest })
        : col
    )
  );

const grid = (grid = [], action) => {
  switch (action.type) {
    case "INIT_GRID":
      return initGrid(grid, action);
    case "RESET_GRID":
      return resetGrid(grid, action);
    case "SET_GRID":
      return setGrid(grid, action);
    case "CLICK_CELL":
      return clickCell(grid, action);
    case "BLOW_CELL":
      return blowCell(grid, action);
    default:
      return grid;
  }
};

export default grid;
