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
  let grid = [];
  for (let i = 0; i < nRows; i++) {
    let col = [];
    for (let j = 0; j < nColumns; j++) {
      col.push({
        activeBalls: 0,
        cellCapacity: getCellCapacity(i, j, nRows, nColumns)
      });
    }
    grid.push(col);
  }
  return grid;
};

const resetGrid = state => state.map(row => row.map(col => null));

const setGrid = (state, { newGrid }) =>
  newGrid?.map(row => row.map(col => col));

const clickCell = (state, { x, y, playerId }) =>
  state.map((row, i) =>
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

const blowCell = (state, { x, y }) =>
  state.map((row, i) =>
    row.map((col, j) =>
      x === i && y === j
        ? ({ playerId, ...rest }) => ({ activeBalls: 0, ...rest })
        : col
    )
  );

const grid = (state = [], action) => {
  switch (action.type) {
    case "INIT_GRID":
      return initGrid(state, action);
    case "RESET_GRID":
      return resetGrid(state, action);
    case "SET_GRID":
      return setGrid(state, action);
    case "CLICK_CELL":
      return clickCell(state, action);
    case "BLOW_CELL":
      return blowCell(state, action);
    default:
      return state;
  }
};

export default grid;
