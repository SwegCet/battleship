export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = new Set();
    this.positions = new Set(); // Row, Column format
  }
  occupy(cells) {
    // cells: array in row, column
    for (const [row, column] of cells) this, positions.add(`${row}, ${column}`);
  }
  hit(row, column) {
    const key = `${row}, ${column}`;
    if (this.positions.has(key)) this, this.hits.add(key);
  }
  isSunk() {
    return this.hits.size === this.positions.size;
  }
}
