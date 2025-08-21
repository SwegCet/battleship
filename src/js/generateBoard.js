export default function generateBoard() {
  const playerBoard = document.getElementById("playerBoard");
  const computerBoard = document.getElementById("computerBoard");

  generate(playerBoard);
  generate(computerBoard);
}

function generate(userBoard, size = 10) {
  //clearing boards before generating
  userBoard.innerHtml = "";

  const frag = document.createDocumentFragment(); // Prevents DOM updating cells 100x
  //For loop through to generate grids
  for (let i = 0; i < size; i++) {
    // row
    for (let j = 0; j < size; j++) {
      // column
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      frag.appendChild(cell); // Appends all 100 cells in memory
    }
  }
  userBoard.appendChild(frag); // UserBoard appends 100 cells in one append instead of 100 times
}
