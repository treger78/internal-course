import { CONSTS } from "../utils/constants.js";

export class GameBoard {
  createBoard() {
    const gameBoard = document.createElement('div');
    gameBoard.id = 'gameBoard';

    let rowItemCounter = CONSTS.BOARD_HEIGTH * CONSTS.BOARD_WIDTH;

    for (let h = 0; h < CONSTS.BOARD_HEIGTH; h += 1) {
      const row = document.createElement('div');
      row.className = 'row';

      for (let w = 0; w < CONSTS.BOARD_WIDTH; w += 1) {
        const rowItem = document.createElement('div');
        rowItem.className = 'rowItem';
        rowItem.id = `${rowItemCounter--}`;
        row.appendChild(rowItem);
      }

      gameBoard.appendChild(row);
    }

    return gameBoard;
  }

  renderBoard(gameBoard) {
    return document.getElementById('root').appendChild(gameBoard);
  }
};
