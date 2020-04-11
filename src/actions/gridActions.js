import { playgroundsRef } from '../config/firebase.database';
import {
  CORNER_CELL_CAPACITY,
  BORDER_CELL_CAPACITY,
  REGULAR_CELL_CAPACITY,
} from '../game_logic/constants';

const getCellCapacity = (i, j, nRows, nCols) => {
  return [0, nRows - 1].includes(i) && [0, nCols - 1].includes(j)
    ? CORNER_CELL_CAPACITY
    : [0, nRows - 1].includes(i) || [0, nCols - 1].includes(j)
    ? BORDER_CELL_CAPACITY
    : REGULAR_CELL_CAPACITY;
};

export const initGrid = (nRows, nColumns) => async (dispatch) => {
  let newGrid = {};
  for (let i = 0; i < nRows; i++) {
    let col = {};
    for (let j = 0; j < nColumns; j++) {
      col[j] = {
        activeBalls: 0,
        cellCapacity: getCellCapacity(i, j, nRows, nColumns),
      };
    }
    newGrid[i] = col;
  }
  const playgroundId = sessionStorage.getItem('playgroundId');
  const updateObj = {};
  updateObj[`/${playgroundId}/grid`] = newGrid;
  return playgroundsRef.update(updateObj);
};

export const fetchGrid = () => async (dispatch) => {
  const playgroundId = sessionStorage.getItem('playgroundId');
  playgroundsRef
    .child(`${playgroundId}`)
    .child(`grid`)
    .on('value', (snapshot) => {
      dispatch(setGrid(snapshot.val() ? snapshot.val() : []));
    });
};

export const resetGrid = () => ({
  type: 'RESET_GRID',
});

export const setGrid = (newGrid) => ({
  type: 'SET_GRID',
  newGrid,
});

export const clickCell = (x, y, playerId) => async (dispatch) => {
  const playgroundId = sessionStorage.getItem('playgroundId');
  return playgroundsRef
    .child(`${playgroundId}`)
    .child(`grid`)
    .child(x)
    .child(y)
    .once('value')
    .then((snapshot) => {
      const updateObj = {};
      updateObj[
        `/${playgroundId}/grid/${x}/${y}/activeBalls`
      ] = ++snapshot.val().activeBalls;
      updateObj[`/${playgroundId}/grid/${x}/${y}/playerId`] = playerId;
      return playgroundsRef.update(updateObj);
    });
};

export const blowCell = (x, y) => async (dispatch) => {
  const playgroundId = sessionStorage.getItem('playgroundId');
  const updateObj = {};
  updateObj[`/${playgroundId}/grid/${x}/${y}/activeBalls`] = 0;
  playgroundsRef.update(updateObj);
  playgroundsRef
    .child(`${playgroundId}`)
    .child(`grid`)
    .child(x)
    .child(y)
    .child('playerId')
    .remove();
};
