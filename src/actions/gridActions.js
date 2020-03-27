
export const initGrid = (numberOfRows, numberOfColumns) => ({
    type: 'INIT_GRID',
    nRows: numberOfRows,
    nColumns: numberOfColumns
})

export const resetGrid = () => ({
    type: 'RESET_GRID'
})

export const clickCell = (x, y, playerId) => ({
    type: 'CLICK_CELL',
    x,
    y,
    playerId
})