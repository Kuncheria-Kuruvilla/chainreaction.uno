import React, { useEffect, useCallback, useState } from 'react';
import './GameBoard.css';

import RegularCell from '../Cell/RegularCell';
import BorderCell from '../Cell/BorderCell';
import CornerCell from '../Cell/CornerCell';
import { clickCell, blowCell } from '../../actions/gridActions';
import { killPlayer, activateNextPlayer } from '../../actions/playersAction';
import { getAdjacentCellCoordinates } from '../../game_logic/utils';
import { useSelector, useDispatch } from 'react-redux';
import GameState from '../../game_logic/game_state';
import { endGame, setWinner } from '../../actions/gameActions';
import GameOptions from '../GameOptions/GameOptions';
import GameOver from '../GameOptions/GameOver';
import PlayerList2x4 from '../PlayerList/PlayerList2x4';
import { Container, Row, Col } from 'react-bootstrap';
import { PLAYER_TIMEOUT } from '../../game_logic/constants';
import CountDownTimer from './CountDownTimer';

const GameBoard = () => {
  const grid = useSelector((state) => state.grid);
  const players = useSelector((state) => state.players);
  const game = useSelector((state) => state.game);
  const currentPlayer = useSelector((state) =>
    state.players.find((player) => player?.active === true)
  );
  const [timeLeft, settimeLeft] = useState(PLAYER_TIMEOUT);

  const dispatch = useDispatch();

  const gameStateRegistry = [];

  const gameEnd = useCallback(() => {
    return (
      game.state === GameState.GAME_ON &&
      players.filter((player) => player.live).length <= 1
    );
  }, [players, game.state]);

  const iAmPlaying = useCallback(() => {
    return currentPlayer?._id === sessionStorage.getItem('playerId');
  }, [currentPlayer]);

  const startChainReaction = (i, j, currentPlayerId) => {
    if (gameStateRegistry.length <= 0) {
      gameStateRegistry.push(grid);
    }
    if (
      gameStateRegistry.length > 0 &&
      (gameStateRegistry[gameStateRegistry.length - 1][i][j].activeBalls ===
        0 ||
        gameStateRegistry[gameStateRegistry.length - 1][i][j]?.activeBalls <
          gameStateRegistry[gameStateRegistry.length - 1][i][j].cellCapacity)
    ) {
      setTimeout(() => dispatch(clickCell(i, j, currentPlayerId)), 100);
      let newGrid =
        gameStateRegistry.length > 0
          ? gameStateRegistry[gameStateRegistry.length - 1].map((row, iter) =>
              row.map(({ activeBalls, playerId, ...rest }, jter) => {
                return iter === i && jter === j
                  ? {
                      activeBalls: activeBalls + 1,
                      playerId: currentPlayerId,
                      ...rest,
                    }
                  : { activeBalls, playerId, ...rest };
              })
            )
          : grid.map((row, iter) =>
              row.map(({ activeBalls, playerId, ...rest }, jter) => {
                return iter === i && jter === j
                  ? {
                      activeBalls: activeBalls + 1,
                      playerId: currentPlayerId,
                      ...rest,
                    }
                  : { activeBalls, playerId, ...rest };
              })
            );
      gameStateRegistry.push(newGrid);
    } else {
      setTimeout(() => dispatch(blowCell(i, j)), 100);
      let newGrid =
        gameStateRegistry.length > 0
          ? gameStateRegistry[gameStateRegistry.length - 1].map((row, iter) =>
              row.map(({ activeBalls, playerId, ...rest }, jter) => {
                return iter === i && jter === j
                  ? {
                      activeBalls: 0,
                      ...rest,
                    }
                  : { activeBalls, playerId, ...rest };
              })
            )
          : grid.map((row, iter) =>
              row.map(({ activeBalls, playerId, ...rest }, jter) => {
                return iter === i && jter === j
                  ? {
                      activeBalls: 0,
                      ...rest,
                    }
                  : { activeBalls, playerId, ...rest };
              })
            );
      gameStateRegistry.push(newGrid);
      const livePlayers = [];
      if (gameStateRegistry.length > 0) {
        players.forEach((player) => {
          let isPlayerAlive = gameStateRegistry[
            gameStateRegistry.length - 1
          ].some((row) => row.some((col) => col.playerId === player?._id));
          if (isPlayerAlive) {
            livePlayers.push(player);
          }
        });
      }
      if (
        livePlayers.length > 1 ||
        !livePlayers.find((player) => player?._id === currentPlayerId)
      ) {
        const nextCoordinates = getAdjacentCellCoordinates(
          i,
          j,
          grid.length,
          grid[0]?.length
        );
        nextCoordinates.forEach((coordinate) => {
          startChainReaction(coordinate.x, coordinate.y, currentPlayerId);
        });
      }
    }
  };

  const handleCellClick = (i, j) => () => {
    if (
      game.state === GameState.GAME_ON &&
      currentPlayer?._id === sessionStorage.getItem('playerId')
    ) {
      if (
        grid[i][j]?.playerId === undefined ||
        grid[i][j]?.playerId === currentPlayer?._id
      ) {
        if (
          grid[i][j]?.activeBalls === 0 ||
          grid[i][j]?.activeBalls < grid[i][j]?.cellCapacity
        )
          dispatch(clickCell(i, j, currentPlayer?._id));
        else {
          startChainReaction(i, j, currentPlayer?._id);
        }
        const playersToBeKilled = [];
        if (gameStateRegistry.length > 0) {
          players.forEach((player) => {
            let isPlayerAlive = gameStateRegistry[
              gameStateRegistry.length - 1
            ].some((row) => row.some((col) => col.playerId === player?._id));
            if (!isPlayerAlive) {
              playersToBeKilled.push(player?._id);
            }
          });
        }
        Promise.all(
          playersToBeKilled.map((playerId) =>
            dispatch(
              killPlayer(sessionStorage.getItem('playgroundId'), playerId)
            )
          )
        ).then(() =>
          dispatch(activateNextPlayer(sessionStorage.getItem('playgroundId')))
        );
      }
    }
  };
  useEffect(() => {
    if (gameEnd()) {
      dispatch(
        setWinner(
          sessionStorage.getItem('playgroundId'),
          players.find((player) => player.live)
        )
      );
      dispatch(endGame(sessionStorage.getItem('playgroundId')));
    }
  }, [players, dispatch, gameEnd]);

  useEffect(() => {
    let timer = null;
    if (game.state === GameState.GAME_ON) {
      timer = setInterval(() => {
        settimeLeft(timeLeft - 100);
        if (timeLeft <= 0) {
          if (iAmPlaying()) {
            dispatch(
              activateNextPlayer(sessionStorage.getItem('playgroundId'))
            );
          }
          clearInterval(timer);
        }
      }, 100);
    }
    return () => {
      clearInterval(timer);
    };
  }, [players, dispatch, game.state, timeLeft, iAmPlaying]);

  useEffect(() => {
    settimeLeft(PLAYER_TIMEOUT);
  }, [players]);

  return (
    <Container>
      <Row>
        <Col className="player-list-container">
          <PlayerList2x4 />
        </Col>
      </Row>
      <Row>
        <Col className="game-grid-container">
          <table className="game-grid">
            <tbody>
              {grid.map((row, i) => {
                return (
                  <tr key={`game-board-row-${i}`}>
                    {i === 0 && (
                      <td rowSpan={grid.length}>
                        <div className="countdown-timer-container">
                          {(iAmPlaying() || true) && (
                            <CountDownTimer
                              now={(timeLeft / PLAYER_TIMEOUT) * 100}
                              max={100}
                              color={currentPlayer?.color}
                            />
                          )}
                        </div>
                      </td>
                    )}
                    {row.map((column, j) => (
                      <td key={`game-board-column-${j}`}>
                        {[0, grid.length - 1].includes(i) &&
                        [0, row.length - 1].includes(j) ? (
                          <CornerCell
                            cellState={grid[i][j]}
                            cellClickHandler={handleCellClick(i, j)}
                          />
                        ) : [0, grid.length - 1].includes(i) ||
                          [0, row.length - 1].includes(j) ? (
                          <BorderCell
                            cellState={grid[i][j]}
                            cellClickHandler={handleCellClick(i, j)}
                          />
                        ) : (
                          <RegularCell
                            cellState={grid[i][j]}
                            cellClickHandler={handleCellClick(i, j)}
                          />
                        )}
                      </td>
                    ))}
                    {i === 0 && (
                      <td rowSpan={grid.length}>
                        <div className="countdown-timer-container">
                          {(iAmPlaying() || true) && (
                            <CountDownTimer
                              now={(timeLeft / PLAYER_TIMEOUT) * 100}
                              max={100}
                              color={currentPlayer?.color}
                            />
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
      </Row>
      <GameOptions show={game.state === GameState.PRE_INCEPTION} />
      <GameOver
        show={game.state === GameState.GAME_OVER}
        winnerNickname={game?.winner?.nickname}
      />
    </Container>
  );
};
export default GameBoard;
