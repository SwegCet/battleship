import Ship from "./ship.js";

class Gameboard {
  constructor(size = 10) {
    this.size = size;
    //Initializes and fills 2D array
    (this.grid = Array.from({ length: size })), () => Array(size).fill(null);
    this.ship = [];
  }

  isBound(row, column) {
    return row >= 0 && column >= 0 && row < this.size && column < this.size;
  }

  cellsFor(row, column, length, orientation = "Horizontal") {
    const cells = [];
    for (let i = 0; i < length; i++) {
      const r = orientation === "Horizontal" ? row : row + i;
      const c = orientation === "Horizontal" ? column + i : column;
      cells.push([r, c]);
    }
    return cells;
  }

  canPlaceShip(row, column, length, orientation = "Horizontal") {
    const cells = this.cellsFor(row, column, length, orientation);
    for (const [r, c] of cells) {
      if (!this.inBounds(r, c)) return false;
      if (this.grid[r][c] !== null) return false;
    }
    return true;
  }

  placeShip(row, column, length, orientation = "Horizontal") {
    if (!this.canPlaceShip(row, column, length, orientation)) {
      throw new Error("Invalid ship placement (out of bounds/overlapping");
    }
    const ship = new Ship(length);
    const cells = this.cellsFor(row, column, length, orientation);
    ship.occupy(cells);
    for (const [r, c] of cells) this.grid[r][c] = { type: "ship", ship };
    this.ships.push(ship);
    return ship;
  }

  receiveAttack(row, column) {
    const cell = this.grid[row][column];
    if (cell === null) {
      this.grid[row][column] = { type: "miss" };
      return { hit: false, sunk: false };
    }
    if (cell.type === "ship") {
      cell.ship.hitAt(row, column);
      this.grid[row][column] = { ...cell, hit: true };
      return { hit: true, sunk: cell.ship.isSunk() };
    }
    return { hit: false, sunk: false, repeat: true };
  }
}
