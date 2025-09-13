import Gameboard from "./gameboard.js";

export default class Player {
  constructor(type = "human") {
    this.type = type;
    this.gameboard = new Gameboard();
    this.moves = new Set();
  }

  makeMove(x, y, enemyBoard) {
    const key = `${x},${y}`;
    if (!this.moves.has(key)) {
      this.moves.add(key);
      return enemyBoard.receiveAttack(x, y);
    }
    return null; // invalid move
  }

  makeRandomMove(enemyBoard) {
    let x, y;
    do {
      x = Math.floor(Math.random() * enemyBoard.size);
      y = Math.floor(Math.random() * enemyBoard.size);
    } while (this.moves.has(`${x},${y}`));

    return this.makeMove(x, y, enemyBoard);
  }
}
