import { playgroundsRef } from '../config/firebase.database';
import { COLOR } from '../game_logic/constants';

export const fetchAllPlayers = () => async (dispatch) => {
  const playgroundId = sessionStorage.getItem('playgroundId');
  playgroundsRef
    .child(`${playgroundId}`)
    .child(`players`)
    .on('value', (snapshot) => {
      var playersList = [];
      for (var playerKey in snapshot.val()) {
        playersList.push(snapshot.val()[playerKey]);
      }
      dispatch(setAllPlayers(playersList));

      if (
        playersList.filter((player) => player.active).length <= 0 &&
        playersList.filter((player) => player.live).length > 1
      ) {
        const updateObj = {};
        const firstLivePlayer = playersList.find((player) => player.live);
        updateObj[
          `/${playgroundId}/players/${firstLivePlayer._id}/active`
        ] = true;
        playgroundsRef.update(updateObj);
      }
    });
};

export const addPlayer = (playgroundId, nickname, host = false) => async (
  dispatch
) =>
  new Promise((resolve, reject) => {
    const playerId = playgroundsRef.child(`${playgroundId}/players`).push().key;
    playgroundsRef
      .child(`${playgroundId}/players`)
      .once('value')
      .then((snapshot) => {
        const playerUpdateObj = {};
        playerUpdateObj[`/${playgroundId}/players/${playerId}`] = {
          _id: playerId,
          color: COLOR[snapshot.numChildren()],
          nickname: nickname,
          active: host ? true : false,
          live: true,
        };
        playgroundsRef.update(playerUpdateObj);

        playgroundsRef
          .child(`/${playgroundId}`)
          .child(`/players`)
          .child(`/${playerId}`)
          .onDisconnect()
          .update({ live: false, active: false });

        resolve(playerId);
      });
  });

export const activateNextPlayer = (playgroundId) => async (dispatch) =>
  playgroundsRef
    .child(`${playgroundId}/players`)
    .orderByKey()
    .once('value')
    .then((snapshot) => {
      var players = [];
      for (var key in snapshot.val()) {
        players.push(snapshot.val()[key]);
      }
      const livePlayers = players.filter((player) => player.live);
      const currentPlayer = livePlayers.find(
        (player) => player?.active === true
      );
      const nextPlayer =
        livePlayers[
          (livePlayers.indexOf(currentPlayer) + 1) % livePlayers.length
        ];
      const playerUpdateObj = {};
      playerUpdateObj[
        `/${playgroundId}/players/${currentPlayer?._id}/active`
      ] = false;
      playerUpdateObj[
        `/${playgroundId}/players/${nextPlayer?._id}/active`
      ] = true;
      return playgroundsRef.update(playerUpdateObj);
    });

export const killPlayer = (playgroundId, playerId) => async (dispatch) =>
  playgroundsRef
    .child(`${playgroundId}/players`)
    .once('value')
    .then((snapshot) => {
      var players = [];
      for (var key in snapshot.val()) {
        players.push(snapshot.val()[key]);
      }
      const playerTobeKilled = players.find(({ _id }) => _id === playerId);
      const playerUpdateObj = {};
      playerUpdateObj[
        `/${playgroundId}/players/${playerTobeKilled._id}/live`
      ] = false;
      return playgroundsRef.update(playerUpdateObj);
    });

export const setAllPlayers = (playersList) => ({
  type: 'SET_ALL_PLAYERS',
  playersList,
});
