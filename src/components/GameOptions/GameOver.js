import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setGame } from '../../actions/gameActions';
import GameState from '../../game_logic/game_state';
import { setAllPlayers } from '../../actions/playersAction';
import { setGrid } from '../../actions/gridActions';
import CloseButton from './CloseButton';

const GameOver = ({ winnerNickname, show }) => {
  const dispatch = useDispatch();
  const handleOnClose = () => {
    sessionStorage.clear('playgroundId');
    sessionStorage.clear('playerId');
    dispatch(setGame({ state: GameState.PRE_INCEPTION }));
    dispatch(setAllPlayers([]));
    dispatch(setGrid([]));
  };
  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="ps-font-medium"
    >
      <Modal.Header>
        <CloseButton onCloseButtonClick={handleOnClose} />
      </Modal.Header>
      <Modal.Body>
        <p className="text-center ps-font-x-large red-shadow">
          {winnerNickname}
        </p>
        <p className="text-center ">HAS WON !!</p>
      </Modal.Body>
    </Modal>
  );
};

export default GameOver;
