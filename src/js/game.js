import RealPlayer from "../../classes/realPlayer.js";
import ComputerPlayer from "../../classes/computerPlayer.js";
import Gameboard from "../../classes/gameboard";

export default class Game {
  constructor(playerBoard, computerBoard, size = 10) {
    //Boards
    this.playerBoard = new Gameboard(size);
    this.computerBoard = new Gameboard(size);

    //players
    this.human = new RealPlayer(this.playerBoard);
    this.computer = new ComputerPlayer(this.computerBoard);
    this.computer.initAI(size);

    //UI
    this.playerBoard = playerBoard;
    this.computerBoard = computerBoard;

    //State
    this.turn = "human"; // Human | Cpu
    this.isOver = false;

    //Fleet config
    this.fleet = [5, 4, 3, 3, 2]; // Carrier, Battleship, Cruiser, Submarine, Destroyer
  }
  // Setup
  autoPlaceAllShips() {
    this.randomlyPlaceFleet(this.playerBoard, this.fleet);
    this.randomlyPlaceFleet(this.computerBoard, this.fleet);
  }

  randomlyPlaceFleet(board, fleet) {
    for (const len of fleet) {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * board.size);
        const col = Math.floor(Math.random() * board.size);
        const orientation = Math.random() < 0.5 ? "H" : "V";
        try {
          board.placeShip(row, col, len, orientation);
          placed = true;
        } catch (error) {
          // If placement fails, try again
        }
      }
    }
  }

  //UI helper
  paintBoardsForStart() {
    // Reveals human ships
    for (let r = 0; r < this.playerBoard.size; r++) {
      for (let c = 0; c < this.playerBoard.size; c++) {
        const cell = this.playerBoard.grid[r][c];
        if (cell && cell.type === "ship") {
          this.queryCell(this.playerBoard, r, c)?.classList.add("ship");
        }
      }
    }
  }

  queryCell(container, row, col, { hit }) {
    const element = this.queryCell(container, row, col);
    if (!element) return;
    element.classList.add(hit ? "hit" : "miss");
    element.classList.add("revealed");
  }

  // Check Wins
  allShipsSunk(board) {
    return board.ships.length > 0 && board.ships.every((ship) => ship.isSunk());
  }

  // Turn Flow
  start() {
    // Build UI grids
    this.generateGrid(this.playerBoard, this.playerBoard.size);
    this.generateGrid(this.computerBoard, this.computerBoard.size);

    // Place Ships
    this.autoPlaceAllShips();
    this.paintBoardsForStart();

    // Human clicks on computer grid
    this.computerBoard.addEventListener("click", this.onHumanClick);
    this.enableHuman(true);
  }

  endGame(winner) {
    this.isOver = true;
    this.enableHuman(false);
  }

  enableHuman(enable) {
    if (enable) {
      this.computerBoard.classList.remove("disabled");
    } else {
      this.computerBoard.classList.add("disabled");
    }
  }

  onHumanClick = (e) => {
    if (this.isOver || this.turn !== "human") return;

    const target = e.target.closest(".cell");
    if (!target) return;

    const row = Number(target.dataset.row);
    const col = Number(target.dataset.col);

    const result = this.human.takeTurn(this.computerBoard, row, col);

    if (result.repeat) {
      return;
    }

    // Update computer grid
    this.markShot(this.computerBoard, row, col, result);

    // Win Check
    if (this.allShipsSunk(this.computerBoard)) {
      this.endGame("human");
      return;
    }

    // CPU turn
    this.turn = "computer";
    this.enableHuman(false);
  };
}
