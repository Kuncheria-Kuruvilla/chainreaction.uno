import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import HostGame from './HostGame';
import JoinGame from './JoinGame';
import './GameOptions.css';

const GameOptions = ({ show }) => {
  const [playerOption, setplayerOption] = useState();
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
