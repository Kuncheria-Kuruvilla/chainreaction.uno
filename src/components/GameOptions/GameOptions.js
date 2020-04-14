import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

import HostGame from './HostGame';
import JoinGame from './JoinGame';
import './GameOptions.css';

const BackButton = ({ onBackButtonClicked }) => {
  return (
    <svg
      onClick={onBackButtonClicked}
      className="bi bi-arrow-left ps-font-medium"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
        clipRule="evenodd"
      />
    </svg>
  );
};
const GameOptions = ({ show }) => {
  const [playerOption, setplayerOption] = useState();
  const [gameHosted, setgameHosted] = useState(false);
  const [gameJoined, setgameJoined] = useState(false);

  const shouldDisplayBackButton = () => {
    return playerOption && !(gameHosted || gameJoined);
  };
  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="ps-font-medium"
    >
      {shouldDisplayBackButton() && (
        <Modal.Header>
          <BackButton onBackButtonClicked={() => setplayerOption()} />
        </Modal.Header>
      )}
      <Modal.Body>
        {playerOption === 'host_game' ? (
          <HostGame onGameHosted={() => setgameHosted(true)}></HostGame>
        ) : playerOption === 'join_game' ? (
          <JoinGame onGameJoined={() => setgameJoined(true)}></JoinGame>
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
