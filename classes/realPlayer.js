import Player from "./player.js";

export default class RealPlayer extends Player {
  constructor(board) {
    super(board);
  }

  takeTurn(opponentBoard, row, column) {
    return this.attack(opponentBoard, row, column);
  }
}
