"use strict";
import { selectDifficulty } from "./modules/random-board.js";
import { isValidSudoku } from "./modules/valid-board.js";

// Select HTML elements
const boardSelector = document.querySelector(".board");
const numbersBoxSelector = document.querySelector(".numbers");
const newGameBtn = document.querySelector(".new-game");
const firstScreenSection = document.querySelector(".first-screen");
const secondScreenSection = document.querySelector(".second-screen");
const levelSelector = document.querySelector(".level");
const timeSelector = document.querySelector(".time");
const keyboardNumbers = document.querySelector(".numbers");
const hintBtn = document.querySelector(".hint");
const solveBtn = document.querySelector(".solve");
const checkBtn = document.querySelector(".check");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseCongrats = document.querySelector(".close-modal");
const restGameBtn = document.querySelector(".back-game");
const countDownElm = document.querySelector(".time-value");
const hintValue = document.querySelector(".hint-value");

let startingMinutes = 1;
let time = startingMinutes * 60;
let level = "hard";
// Declare board, board With Solution
let board, boardWithSolution;
// Level Variables
let levelsValues = ["Easy", "medium", "hard"];
let levelIndex = 0;
// Time Variables
let timeValues = ["3", "5", "8"];
let timeIndex = 0;
// saving keyboard value.
let tempValue = "";
// Constant Colors.
const focusBox = "#0c8dea";
const undoFocusBox = "#111112";
const colorBoxValue = "#010003";
// Declare oldBox just initial value as div
let oldBox = document.createElement("div");

let myTimer;
let hints = 0;
function updateCountDown() {
  let minutes = Math.floor(time / 60) + "";
  let second = (time % 60) + "";
  if (time < 0) {
    lockBoard();
    snackBar("Time End");
    countDownElm.innerHTML = `00:00`;
    clearInterval(myTimer);
  } else {
    time--;
    if (minutes.length === 1) minutes = "0" + minutes;
    if (second.length === 1) second = "0" + second;
    countDownElm.innerHTML = `${minutes}: ${second} `;
  }
}

function openCongrats() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeCongrats() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function timeChangeValue() {
  if (timeIndex == timeValues.length) timeIndex = 0;
  timeSelector.textContent = timeValues[timeIndex] + " Minute";
  timeSelector.setAttribute("value", timeValues[timeIndex]);
  timeIndex++;
}

function levelChangeValue() {
  if (levelIndex == levelsValues.length) levelIndex = 0;
  levelSelector.textContent = levelsValues[levelIndex];
  levelSelector.setAttribute("value", levelsValues[levelIndex]);
  levelIndex++;
}

function startNewGame() {
  startingMinutes = Math.floor(time / 60);
  time = parseInt(timeSelector.getAttribute("value")) * 60;
  myTimer = setInterval(updateCountDown, 1000);
  level = levelSelector.getAttribute("value");

  if (!level || !time) {
    snackBar("Choose Level and Time.");
    return;
  }

  //
  countDownElm.textContent = `${timeSelector.getAttribute("value")} Minute`;
  //
  if (level == "hard") hints = 10;
  else if (level == "medium") hints = 12;
  else hints = 15;
  hintValue.textContent = hints;

  // hide first screen
  firstScreenSection.classList.add("hide");
  // Get board and board with boardWithSolution
  [board, boardWithSolution] = selectDifficulty(level);
  // Set Up board
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.classList.add("-board");

      if ((j + 1) % 3 == 0 && j != 0) box.style.marginRight = "6px";
      if ((i + 1) % 3 == 0 && i != 0) box.style.marginBottom = "6px";
      box.textContent = board[i][j];
      if (board[i][j] != "") {
        box.style.backgroundColor = colorBoxValue;
        box.style.textShadow = "1px 1px #ffff";
        box.setAttribute("original", `no-mutate`);
      }
      box.setAttribute("id", `${i}${j}`);
      boardSelector.appendChild(box);
    }
  }
  // Set Up numbers container
  for (let j = 1; j <= 10; j++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.textContent = j;
    box.setAttribute("value", `${j}`);
    if (j == 10) {
      box.textContent = "Clear";
      box.setAttribute("value", "");
    }
    numbersBoxSelector.appendChild(box);
  }
  // Show second screen
  secondScreenSection.classList.remove("hide");
}
// Get number from keyboard.
function getNumber(e) {
  oldBox.style.backgroundColor = undoFocusBox;
  if (!e.target.classList.contains("box")) return;
  tempValue = e.target.getAttribute("value");
  oldBox = e.target;
  e.target.style.backgroundColor = focusBox;
}

// Set number in box.
function setNumber(e) {
  if (!e.target.classList.contains("box")) return;
  if (e.target.getAttribute("original") === "no-mutate") {
    return;
  }
  let [row, col] = e.target.getAttribute("id").split("");
  board[row][col] = tempValue;
  e.target.textContent = tempValue;
  e.target.style.color = "#FFF317";
  let numberOfValuesInBoard = board.flat().filter((elm) => elm !== "").length;
  if (numberOfValuesInBoard === 81 && isValidSudoku(board)) {
    isValidSudoku(board) ? openCongrats() : null;
    lockBoard();
    clearInterval(myTimer);
  }
}
// Check board is valid.
function validBoard() {
  isValidSudoku(board) ? snackBar("Valid") : snackBar("Invalid");
}

// Solve board.
function solveBoard() {
  clearInterval(myTimer);
  const boxes = document.querySelectorAll(".-board");
  boxes.forEach((box) => {
    box.style.backgroundColor = colorBoxValue;
    let [row, col] = box.getAttribute("id").split("");
    box.setAttribute("original", `no-mutate`);
    box.textContent = boardWithSolution[row][col];
  });
}
// Solve wrong box.
function hint() {
  if (hints == 0) return;
  hints--;
  hintValue.textContent = hints;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const box = document.getElementById(`${i}${j}`);
      if (!box.getAttribute("original") && board[i][j] !== boardWithSolution[i][j]) {
        board[i][j] = boardWithSolution[i][j];
        box.style.backgroundColor = colorBoxValue;
        box.setAttribute("original", `no-mutate`);
        box.style.color = "rgba(0,150,0)";
        box.textContent = boardWithSolution[i][j];
        let numberOfValuesInBoard = board.flat().filter((elm) => elm !== "").length;
        if (numberOfValuesInBoard === 81 && isValidSudoku(board)) {
          isValidSudoku(board) ? openCongrats() : null;
          lockBoard();
          clearInterval(myTimer);
        }
        return;
      }
    }
  }
}
// Close all fields in board.
function lockBoard() {
  const boxes = document.querySelectorAll(".-board");
  boxes.forEach((box) => {
    box.setAttribute("original", `no-mutate`);
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function restartGame() {
  removeAllChildNodes(boardSelector);
  removeAllChildNodes(keyboardNumbers);
  firstScreenSection.classList.remove("hide");
  secondScreenSection.classList.add("hide");
  clearInterval(myTimer);
  countDownElm.innerHTML = "&nbsp;";
}

function snackBar(text) {
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.textContent = text;
  setTimeout(() => {
    x.className = x.className.replace("show", "");
  }, 3000);
}

// Add Event Listener
newGameBtn.addEventListener("click", startNewGame);
levelSelector.addEventListener("click", levelChangeValue);
timeSelector.addEventListener("click", timeChangeValue);
keyboardNumbers.addEventListener("click", getNumber);
boardSelector.addEventListener("click", setNumber);
hintBtn.addEventListener("click", hint);
solveBtn.addEventListener("click", solveBoard);
checkBtn.addEventListener("click", validBoard);
btnCloseCongrats.addEventListener("click", closeCongrats);
overlay.addEventListener("click", closeCongrats);
restGameBtn.addEventListener("click", restartGame);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeCongrats();
  }
});
