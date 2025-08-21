import Player from "./player.js";

export default class ComputerPlayer extends Player {
  constructor(board) {
    super(board);
    this.huntPool = [];
    this.targetQueue = [];
  }

  initAI(boardSize = 10) {
    this.huntPool = [];
    for (let row = 0; row < boardSize; row++) {
      for (let column = 0; column < boardSize; column++) {
        this.huntPool.push([row, column]);
      }
    }
    this.huntPool.sort(() => Math.random() - 0.5);
  }

  pickCell() {
    //If we hit target cell, prefer adjacent ones
    while (this.targetQueue.length) {
      const [row, column] = this.targetQueue.shift();
      if (!this.hasShot(row, column)) return [row, column];
    }
    //Otherwise hunt randomly
    while (this.targetQueue.length) {
      const [row, column] = this.huntPool.pop();
      if (!this.hasShot(row, column)) return [row, column];
    }
    return null;
  }

  enqueueNeighbors(opponentBoard, row, column) {
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    for (const [dr, dc] of directions) {
      const nextRow = row + dr,
        nextCol = column + dc;
      if (
        nextRow >= 0 &&
        nextCol >= 0 &&
        nextRow < opponentBoard.size &&
        nextCol < opponentBoard.size
      ) {
        if (!this.hasShot(nextRow, nextCol)) {
          this.targetQueue.push[(nextRow, nextCol)];
        }
      }
    }
  }

  takeTurn(opponentBoard) {
    if (this.huntPool.length === 0 && this.shotsTaken.size === 0) {
      this.initAI(opponentBoard.size);
    }
    const cell = this.pickCell();
    if (!cell) return { done: true };

    const [row, column] = cell;
    const result = this.attack(opponentBoard, row, column);

    if (result.hit) {
      this.enqueueNeighbors(opponentBoard, row, column);
      if (result.sunk) {
        this.targetQueue = []; //reset after sinking a ship
      }
    }
    return { ...result, row, column };
  }
}
