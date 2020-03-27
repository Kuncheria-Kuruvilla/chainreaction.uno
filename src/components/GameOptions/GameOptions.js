import React, { useState } from "react";
import { connect } from "react-redux";
import { initGrid, resetGrid } from "../../actions/gridActions"
import { addPlayer, activatePlayer } from "../../actions/playersAction"

const mapStateToProps = ({ players }) => ({
    players
})
function GameOptions({ players, dispatch }) {
    const [activeGame, setactiveGame] = useState(false)
    const [rows, setrows] = useState(3)
    const [colums, setcolums] = useState(3)
    const startGame = () => {
        setactiveGame(true);
        let plyerNames = ["John wick", "Slade Wilson"];
        plyerNames.map(player => dispatch(addPlayer(player)))
        const playerWithFirstTurn = players.find(player => player.turn === 0)
        dispatch(activatePlayer(playerWithFirstTurn?._id));
        dispatch(initGrid(rows, colums))
    }
    const resetGame = () => {
        const playerWithFirstTurn = players.find(player => player.turn === 0)
        dispatch(activatePlayer(playerWithFirstTurn?._id));
        dispatch(resetGrid());
    }

    return (
        <React.Fragment>
            {!activeGame ?
            <React.Fragment>
            <label for="number-of-rows"></label>
            <input type="number" id="number-of-rows" value={rows} onChange = {(e)=> setrows(e.target.value)}/>
            <label for="number-of-coloumns"></label>
            <input type="number" id="number-of-coloumns" value={colums} onChange = {(e)=> setcolums(e.target.value)}/>
            </React.Fragment>
            :null}
            {!activeGame ?
                <button onClick={startGame}>Start Game</button> :
                <button onClick={resetGame}>Reset Game</button>}

        </React.Fragment>
    );
}

export default connect(mapStateToProps)(GameOptions);
