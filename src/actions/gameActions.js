import GameState from "../game_logic/game_state";

export const startGame = () => ({
  type: "START_GAME",
  state: GameState.GAME_ON
});

export const endGame = () => ({
  type: "END_GAME",
  state: GameState.GAME_OVER
});

export const setWinner = playerId => ({
  winner: playerId
});
