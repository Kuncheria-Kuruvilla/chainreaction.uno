const addPlayer = (state, { _id, color, nickname, turn, active, live }) => [...state, {
    _id, color, nickname, turn, active, live
}]

const disablePlayer = (state, { id }) =>
    state.map(player => player._id === id ? { ...player, active: false } : player)


const activatePlayer = (state, { id }) =>
    state.map(player => player._id === id ? { ...player, active: true } : player)

const killPlayer = (state, { id }) =>
    state.map(player => player._id === id ? { ...player, live: false } : player)

    const players = (state = [], action) => {
    switch (action.type) {
        case 'ADD_PLAYER':
            return addPlayer(state, action);
        case 'DISABLE_PLAYER':
            return disablePlayer(state, action);
        case 'ACTIVATE_PLAYER':
            return activatePlayer(state, action);
        case 'KILL_PLAYER':
            return killPlayer(state, action)
        default:
            return state;
    }
}

export default players;