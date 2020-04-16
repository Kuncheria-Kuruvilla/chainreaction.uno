import React, { useEffect, useCallback } from 'react';
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

const GameBoard = () => {
  const grid = useSelector((state) => state.grid);
  const players = useSelector((state) => state.players);
  const game = useSelector((state) => state.game);

  const dispatch = useDispatch();

  const gameStateRegistry = [];

  const gameEnd = useCallback(() => {
    return (
      game.state === GameState.GAME_ON &&
      players.filter((player) => player.live).length <= 1
    );
  }, [players, game.state]);

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
  };

  const handleCellClick = (i, j) => () => {
    const currentPlayer = players.find((player) => player?.active === true);
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
                    {row.map((column, j) => (
                      <td key={`game-board-column-${j}`}>
                        {[0, grid.length - 1].includes(i) &&
                        [0, row.length - 1].includes(j) ? (
                          <CornerCell
                            cellState={grid[i][j]}
                            cellClickHandler={handleCellClick(i, j)}
                          ></CornerCell>
                        ) : [0, grid.length - 1].includes(i) ||
                          [0, row.length - 1].includes(j) ? (
                          <BorderCell
                            cellState={grid[i][j]}
                            cellClickHandler={handleCellClick(i, j)}
                          ></BorderCell>
                        ) : (
                          <RegularCell
                            cellState={grid[i][j]}
                            cellClickHandler={handleCellClick(i, j)}
                          ></RegularCell>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
      </Row>
      <GameOptions show={game.state === GameState.PRE_INCEPTION}></GameOptions>
      <GameOver
        show={game.state === GameState.GAME_OVER}
        winnerNickname={game?.winner?.nickname}
      ></GameOver>
    </Container>
  );
};
export default GameBoard;
