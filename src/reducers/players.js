const addPlayer = (players, { _id, color, nickname, turn, active, live }) => [
  ...players,
  {
    _id,
    color,
    nickname,
    turn,
    active,
    live,
  },
];

const disablePlayer = (players, { id }) =>
  players.map((player) =>
    player._id === id ? { ...player, active: false } : player
  );

const activatePlayer = (players, { id }) =>
  players.map((player) =>
    player._id === id ? { ...player, active: true } : player
  );

const activateNextPlayer = (players) => {
  const currentPlayer = players
    .filter((player) => player.live)
    .find((player) => player?.active === true);
  const nextPlayer = players
    .filter((player) => player.live)
    .find(
      (player) =>
        player?.turn ===
        (currentPlayer?.turn + 1) %
          players.filter((player) => player.live).length
    );
  return players.map((player) =>
    player._id === nextPlayer._id
      ? { ...player, active: true }
      : { ...player, active: false }
  );
};

const killPlayer = (players, { id }) => {
  const playerTobeKilled = players.find(({ _id }) => _id === id);
  return players.map((player) =>
    player._id === id
      ? { ...player, live: false }
      : player.turn > playerTobeKilled.turn
      ? { ...player, turn: --player.turn }
      : player
  );
};

const reviveAllPlayers = (players) => {
  return players.map((player, index) => ({
    ...player,
    live: true,
    turn: index,
  }));
};

const setAllPlayers = (players, { playersList }) => {
  return playersList.map((player) => player);
};
const players = (players = [], action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return addPlayer(players, action);
    case 'DISABLE_PLAYER':
      return disablePlayer(players, action);
    case 'ACTIVATE_PLAYER':
      return activatePlayer(players, action);
    case 'ACTIVATE_NEXT_PLAYER':
      return activateNextPlayer(players);
    case 'KILL_PLAYER':
      return killPlayer(players, action);
    case 'REVIVE_ALL_PLAYERS':
      return reviveAllPlayers(players);
    case 'SET_ALL_PLAYERS':
      return setAllPlayers(players, action);
    default:
      return players;
  }
};

export default players;
