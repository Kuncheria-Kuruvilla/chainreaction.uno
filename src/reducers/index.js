import { combineReducers } from 'redux';

import grid from './grid';
import players from './players';
import game from './game';

export default combineReducers({
  game,
  grid,
  players,
});
