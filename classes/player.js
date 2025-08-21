export default class Player {
  constructor(board) {
    this.board = board; // Own Gameboard
    this.shotsTaken = new Set(); // Row Column Opponent
  }

  hasShot(row, column) {
    return this.shotsTaken.has(`${row},${column}`);
  }

  recordShot(row, column) {
    this.shotsTaken.add(`${row},${column}`);
  }

  //Perform the attack on opponent's board (bounds & repeat-safe)
  attack(opponentBoard, row, column) {
    const key = `${row}, ${column}`;
    if (this.hasShot(row, column)) {
      return { repeat: true, hit: false, sunk: false };
    }
    this.recordShot(row, column);
    return opponentBoard.receiveAttack(row, column);
  }
}
