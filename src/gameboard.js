export default class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = {};
    this.missedShots = [];
    this.ships = [];
  }

  placeShip(ship, coords) {
    coords.forEach(([x, y]) => {
      this.board[`${x},${y}`] = ship;
    });
    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    const key = `${x},${y}`;
    if (this.board[key]) {
      this.board[key].hit();
      return "hit";
    } else {
      this.missedShots.push([x, y]);
      return "miss";
    }
  }

  allSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
