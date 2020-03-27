

const initGrid = (state, { nRows, nColumns }) => {
    let grid = [];
    for (let i = 0; i < nRows; i++) {
        let col = [];
        for (let j = 0; j < nColumns; j++) {
            col.push(null)
        }
        grid.push(col)
    }
    return grid;
}

const resetGrid = (state) => state.map(row => row.map(col => null))

const clickCell =
    (state, { x, y, playerId }) =>
        state.map((row, i) =>
            row.map((col, j) =>
                x === i && y === j ? { ...col, activeBalls: (col?.activeBalls ? ++col.activeBalls : 1), playerId } : col
            ));

const grid = (state = [], action) => {
    switch (action.type) {
        case 'INIT_GRID':
            return initGrid(state, action);
        case 'RESET_GRID':
            return resetGrid(state, action);
        case 'CLICK_CELL':
            return clickCell(state, action);
        default:
            return state;
    }
}

export default grid