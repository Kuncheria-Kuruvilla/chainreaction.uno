export const getAdjacentCellCoordinates = (x, y, nRows, nCols) => {
  const cells = [];

  if (x > 0) {
    cells.push({
      x: x - 1,
      y,
    });
  }

  if (x < nRows - 1) {
    cells.push({
      x: x + 1,
      y,
    });
  }

  if (y > 0) {
    cells.push({
      x,
      y: y - 1,
    });
  }

  if (y < nCols - 1) {
    cells.push({
      x,
      y: y + 1,
    });
  }

  return cells;
};
