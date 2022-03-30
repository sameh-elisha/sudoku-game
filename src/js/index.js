// const selectDifficulty = require("./modules-seduko/random-board.js");
// console.log(selectDifficulty.selectDifficulty("easy"));
const boardSelector = document.querySelector(".board");
const board = [
  ["5", "3", "", "", "7", "", "", "", ""],
  ["6", "", "", "1", "9", "5", "", "", ""],
  ["", "9", "8", "", "", "", "", "6", ""],
  ["8", "", "", "", "6", "", "", "", "3"],
  ["4", "", "", "8", "", "3", "", "", "1"],
  ["7", "", "", "", "2", "", "", "", "6"],
  ["", "6", "", "", "", "", "2", "8", ""],
  ["", "", "", "4", "1", "9", "", "", "5"],
  ["", "", "", "", "8", "", "", "7", "9"],
];

for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    const box = document.createElement("div");
    box.classList.add("box");
    if ((j + 1) % 3 == 0 && j != 0) box.style.marginRight = "10px";
    if ((i + 1) % 3 == 0 && i != 0) box.style.marginBottom = "6px";
    box.textContent = board[i][j];
    if (board[i][j] != "") box.style.backgroundColor = "#010003";
    box.setAttribute("index", `${i}${j}`);
    boardSelector.appendChild(box);
  }
}
