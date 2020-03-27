/*---------------------------------------*/
//To be changed with UUID or id generated at database layer
let playerId = 0

//Find better colors
const color = ["red", "green", "blue", "gold", "teal", "purple", "hotpink", "aqua"]

//Verify logic for player turn
let playTurn = 0;
/*---------------------------------------*/
export const addPlayer = (nickname) => ({
    type: 'ADD_PLAYER',
    _id: playerId,
    color: color[playerId++],
    nickname: nickname,
    turn: playTurn,
    active: playTurn++ === 0 ? true : false, // true if it's his turn
    live: true //falls if he dies playing or leaves the game because he was bit by a zombiee
})

export const disablePlayer = (id) => ({
    type: 'DISABLE_PLAYER',
    id
})

export const activatePlayer = (id) => ({
    type: 'ACTIVATE_PLAYER',
    id
})

export const killPlayer = (id) => ({
    type: 'KILL_PLAYER',
    id
})