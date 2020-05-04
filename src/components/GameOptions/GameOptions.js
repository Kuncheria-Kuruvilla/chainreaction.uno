import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import HostGame from './HostGame';
import JoinGame from './JoinGame';
import './GameOptions.css';
import { useDispatch } from 'react-redux';
import { setGame } from '../../actions/gameActions';
import { setAllPlayers, killPlayer } from '../../actions/playersAction';
import { setGrid } from '../../actions/gridActions';
import GameState from '../../game_logic/game_state';
import CloseButton from './CloseButton';

const GameOptions = ({ show }) => {
  const [playerOption, setplayerOption] = useState();
  const dispatch = useDispatch();

  const shouldDisplayCloseButton = () => {
    return playerOption;
  };
  const handleOnClose = () => {
    if (
      sessionStorage.getItem('playgroundId') &&
      sessionStorage.getItem('playerId')
    )
      dispatch(
        killPlayer(
          sessionStorage.getItem('playgroundId'),
          sessionStorage.getItem('playerId')
        )
      );
    sessionStorage.clear('playgroundId');
    sessionStorage.clear('playerId');
    setplayerOption();
    dispatch(setGame({ state: GameState.PRE_INCEPTION }));
    dispatch(setAllPlayers([]));
    dispatch(setGrid([]));
  };
  useEffect(() => {
    setplayerOption();
  }, [show]);
  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="ps-font-medium"
      backdropClassName="modal-backdrop-oppaque"
    >
      {shouldDisplayCloseButton() && (
        <Modal.Header>
          <CloseButton onCloseButtonClick={handleOnClose} />
        </Modal.Header>
      )}

      <Modal.Body>
        {playerOption === 'host_game' ? (
          <HostGame />
        ) : playerOption === 'join_game' ? (
          <JoinGame />
        ) : (
          <div className="btn-containers">
            <button
              onClick={() => setplayerOption('host_game')}
              className="btn red-border-btn"
            >
              Host Game
            </button>
            <button
              onClick={() => setplayerOption('join_game')}
              className="btn red-border-btn"
            >
              Join Game
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default GameOptions;
