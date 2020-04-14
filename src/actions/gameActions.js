import GameState from '../game_logic/game_state';
import { accesscodeMapRef, playgroundsRef } from '../config/firebase.database';
import { MAX_ALLOWED_PLAYERS } from '../game_logic/constants';

export const hostGameAction = () => async (dispatch) => {
  return new Promise((resolve, reject) => {
    var newGameKey = playgroundsRef.push().key;
    var updates = {};
    updates[`/${newGameKey}/game`] = { state: GameState.PRE_INCEPTION };
    playgroundsRef.update(updates);

    const accessCode =
      '' +
      Math.floor(Math.random() * 10) +
      Math.floor(Math.random() * 10) +
      Math.floor(Math.random() * 10) +
      Math.floor(Math.random() * 10);
    var mapItem = {};
    mapItem[accessCode] = newGameKey;
    accesscodeMapRef.update(mapItem);
    resolve({ playgroundId: newGameKey, code: accessCode });
  });
};

export const startGameAction = () => async (dispatch) => {
  const playgroundId = sessionStorage.getItem('playgroundId');
  var updates = {};
  updates[`/${playgroundId}/game`] = { state: GameState.GAME_ON, winner: null };
  playgroundsRef.update(updates);
};

export const joinGameAction = (gameCode) => async (dispatch) =>
  accesscodeMapRef
    .child(gameCode)
    .once('value')
    .then((accessCodeSnapshot) =>
      playgroundsRef
        .child(accessCodeSnapshot.val())
        .child('game')
        .child('state')
        .once('value')
        .then((gameStateSnapshot) =>
          gameStateSnapshot.val() === GameState.PRE_INCEPTION
            ? playgroundsRef
                .child(accessCodeSnapshot.val())
                .child('players')
                .once('value')
                .then((playersSnapshot) =>
                  playersSnapshot.numChildren() < MAX_ALLOWED_PLAYERS
                    ? Promise.resolve(accessCodeSnapshot.val())
                    : Promise.reject(
                        `Cannot add more than ${MAX_ALLOWED_PLAYERS} player`
                      )
                )
            : Promise.reject('Game has already started')
        )
    );

export const endGame = (playgroundId) => async (dispatch) => {
  var updates = {};
  updates[`/${playgroundId}/game/state`] = GameState.GAME_OVER;
  return playgroundsRef.update(updates);
};

export const setWinner = (playgroundId, playerId) => async (dispatch) => {
  var updates = {};
  updates[`/${playgroundId}/game/winner`] = playerId;
  return playgroundsRef.update(updates);
};

export const fetchGame = () => async (dispatch) => {
  const playgroundId = sessionStorage.getItem('playgroundId');
  playgroundsRef
    .child(`${playgroundId}`)
    .child(`game`)
    .on('value', (snapshot) => {
      dispatch(setGame(snapshot.val()));
    });
};

export const setGame = (game) => ({
  type: 'SET_GAME',
  game,
});
