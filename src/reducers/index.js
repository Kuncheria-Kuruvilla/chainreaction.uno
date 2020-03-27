import { combineReducers } from 'redux'
import grid from "./grid"
import players from './players'

export default combineReducers({
    grid,
    players
  })