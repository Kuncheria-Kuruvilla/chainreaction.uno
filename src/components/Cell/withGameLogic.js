import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";


const mapStateToProps = ({ players }) => ({
    players
})

const witthGameLogic = (WrappedComponent, CELL_CAPACITY) => ({ cellState, players, cellClickHandler, blowCell, ...passThroughProps }) => {
    const [possedPlayer, setPossedPlayer] = useState();
    const [currentPlayer, setCurrentPlayer] = useState()
    useEffect(() => {
        const possedPlayer = players.find(player => player._id === cellState?.playerId)
        setPossedPlayer(possedPlayer)
    }, [players, cellState])

    useEffect(() => {
        const currentPlayer = players.find(player => player.active === true)
        setCurrentPlayer(currentPlayer)
    }, [players])
    const handleCellClick = () => {
        cellState ? cellState.activeBalls < CELL_CAPACITY ? cellClickHandler() : blowCell() : cellClickHandler();
    }
    return (
        <WrappedComponent currentPlayer={currentPlayer} possedPlayer={possedPlayer} handleCellClick={handleCellClick} cellState={cellState}{...passThroughProps} />
    )
}
export default compose(
    connect(mapStateToProps),
    witthGameLogic
);