"use strict";
import { selectDifficulty } from "./modules/random-board.js";
import { isValidSudoku } from "./modules/valid-board.js";

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

let board, solution;

let levelsValues = ["Easy", "medium", "hard"];
let levelIndex = 0;

let timeValues = ["3", "5", "8"];
let timeIndex = 0;

let tempValue = "";
const focusBox = "#0c8dea";
const undoFocusBox = "#111112";
let oldBox = document.createElement("div");

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
  let level = levelSelector.getAttribute("value");
  let time = timeSelector.getAttribute("value");

  if (!level || !time) {
    alert("Choose Level and Time.");
    return;
  }

  // hide first screen
  firstScreenSection.classList.add("hide");
  // Get board and board with solution
  [board, solution] = selectDifficulty(level);
  console.log(solution);
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
        box.style.backgroundColor = "#010003";
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
function getNumber(e) {
  oldBox.style.backgroundColor = undoFocusBox;
  if (!e.target.classList.contains("box")) return;
  tempValue = e.target.getAttribute("value");
  oldBox = e.target;
  e.target.style.backgroundColor = focusBox;
}

function setNumber(e) {
  if (!e.target.classList.contains("box")) return;
  if (e.target.getAttribute("original") === "no-mutate") {
    return;
  }
  let [row, col] = e.target.getAttribute("id").split("");
  board[row][col] = tempValue;
  e.target.textContent = tempValue;
  let numberOfValuesInBoard = board.flat().filter((elm) => elm !== "").length;
  if (numberOfValuesInBoard === 81) {
    isValidSudoku(board) ? alert("Congrats") : null;
    lockBoard();
  }
}

function validBoard() {
  isValidSudoku(board) ? alert("Valid") : alert("Invalid.");
}

function solveBoard() {
  const boxes = document.querySelectorAll(".-board");
  boxes.forEach((box) => {
    box.style.backgroundColor = "#010003";
    let [row, col] = box.getAttribute("id").split("");
    box.setAttribute("original", `no-mutate`);
    box.textContent = solution[row][col];
  });
}

function hint() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == "") {
        const box = document.getElementById(`${i}${j}`);
        board[i][j] = solution[i][j];
        box.style.backgroundColor = "#010003";
        box.setAttribute("original", `no-mutate`);
        box.style.backgroundColor = "rgba(0,200,0)";
        box.style.color = "fff";
        box.textContent = solution[i][j];
        let numberOfValuesInBoard = board.flat().filter((elm) => elm !== "").length;
        if (numberOfValuesInBoard === 81) {
          isValidSudoku(board) ? alert("Congrats") : null;
          lockBoard();
        }
        return;
      }
    }
  }
}
function lockBoard() {
  const boxes = document.querySelectorAll(".-board");
  boxes.forEach((box) => {
    box.setAttribute("original", `no-mutate`);
  });
}
newGameBtn.addEventListener("click", startNewGame);
levelSelector.addEventListener("click", levelChangeValue);
timeSelector.addEventListener("click", timeChangeValue);
keyboardNumbers.addEventListener("click", getNumber);
boardSelector.addEventListener("click", setNumber);
hintBtn.addEventListener("click", hint);
solveBtn.addEventListener("click", solveBoard);
checkBtn.addEventListener("click", validBoard);
