import Ship from "./ship.js";
import Player from "./player.js";

// --- Setup Players ---
const human = new Player("human");
const computer = new Player("computer");

// --- Place Ships (simple fixed positions for now) ---
human.gameboard.placeShip(new Ship(2), [
  [0, 0],
  [0, 1],
]);
human.gameboard.placeShip(new Ship(3), [
  [2, 2],
  [2, 3],
  [2, 4],
]);

computer.gameboard.placeShip(new Ship(2), [
  [5, 5],
  [5, 6],
]);
computer.gameboard.placeShip(new Ship(3), [
  [7, 1],
  [8, 1],
  [9, 1],
]);

// --- DOM Rendering ---
function createBoard(boardElement, isComputer = false) {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;

      if (isComputer) {
        cell.addEventListener("click", () => {
          const result = human.makeMove(x, y, computer.gameboard);

          if (result === "hit") cell.classList.add("hit");
          else if (result === "miss") cell.classList.add("miss");

          // Computer plays next
          if (!computer.gameboard.allSunk()) {
            computerTurn();
          } else {
            alert("You win!");
          }
        });
      }

      boardElement.appendChild(cell);
    }
  }
}

function computerTurn() {
  const result = computer.makeRandomMove(human.gameboard);
  // Update player board UI
  const boardElement = document.getElementById("player-board");

  if (result) {
    const lastMove = Array.from(computer.moves).pop();
    const [x, y] = lastMove.split(",").map(Number);
    const cell = boardElement.querySelector(`[data-x='${x}'][data-y='${y}']`);

    if (result === "hit") cell.classList.add("hit");
    else if (result === "miss") cell.classList.add("miss");

    if (human.gameboard.allSunk()) {
      alert("Computer wins!");
    }
  }
}

// --- Init Boards ---
createBoard(document.getElementById("player-board"), false);
createBoard(document.getElementById("computer-board"), true);
