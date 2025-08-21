// Import all dependencies
import Gameboard from "../classes/gameboard.js";
import RealPlayer from "../classes/realPlayer.js";
import ComputerPlayer from "../classes/computerPlayer.js";
import generateBoard from "./js/generateBoard.js";

//Load DOM, Need button to start game
generateBoard(); // Works

//On event click on game start button on modal, initialize turn base

const startButton = document.querySelector(".startButton");
const cell = document.querySelectorAll(".cell");

// Click, call function to start game.
startButton.addEventListener("click", () => {
  console.log("Clicked");
});

//A better way to implement is to add event listener on the boards rather than adding 200 event listeners
cell.forEach((cell) => {
  cell.addEventListener("click", () => {
    console.log("boop");
  });
});
