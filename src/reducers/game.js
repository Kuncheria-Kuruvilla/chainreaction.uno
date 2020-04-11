import GameState from '../game_logic/game_state';

const startGame = (game, { state }) => ({ ...game, state });

const endGame = (game, { state }) => ({ ...game, state });

const setWinner = (game, { winner }) => ({ ...game, winner });
const setGame = (gameInStore, { game }) => ({
  ...game,
});

const game = (game = { state: GameState.PRE_INCEPTION }, action) => {
  switch (action.type) {
    case 'START_GAME':
      return startGame(game, action);
    case 'END_GAME':
      return endGame(game, action);
    case 'SET_WINNER':
      return setWinner(game, action);
    case 'SET_GAME':
      return setGame(game, action);
    default:
      return game;
  }
};
export default game;
