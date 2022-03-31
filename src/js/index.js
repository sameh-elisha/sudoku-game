"use strict";
import { selectDifficulty } from "./modules/random-board.js";

const boardSelector = document.querySelector(".board");
const numbersBoxSelector = document.querySelector(".numbers");
const newGameBtn = document.querySelector(".new-game");
const firstScreenSection = document.querySelector(".first-screen");
const secondScreenSection = document.querySelector(".second-screen");
const levelSelector = document.querySelector(".level");
const timeSelector = document.querySelector(".time");

let board, solution;

let levelsValues = ["Easy", "medium", "hard"];
let levelIndex = 0;

let timeValues = ["3", "5", "8"];
let timeIndex = 0;

function timeChangeValue() {
  if (timeIndex == timeValues.length) timeIndex = 0;

  timeSelector.textContent = timeValues[timeIndex] + " Minute";
  timeIndex++;
}

function levelChangeValue() {
  if (levelIndex == levelsValues.length) levelIndex = 0;

  levelSelector.textContent = levelsValues[levelIndex];
  levelIndex++;
}

function startNewGame() {
  // hide first screen
  firstScreenSection.classList.add("hide");
  // Get board and board with solution
  [board, solution] = selectDifficulty("hard");
  // Set Up board
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      if ((j + 1) % 3 == 0 && j != 0) box.style.marginRight = "6px";
      if ((i + 1) % 3 == 0 && i != 0) box.style.marginBottom = "6px";
      box.textContent = board[i][j];
      if (board[i][j] != "") box.style.backgroundColor = "#010003";
      box.setAttribute("index", `${i}${j}`);
      boardSelector.appendChild(box);
    }
  }
  // Set Up numbers container
  for (let j = 1; j <= 10; j++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.textContent = j;
    box.setAttribute("index", `${j}`);
    if (j == 10) {
      box.textContent = "Clear";
      box.setAttribute("index", ``);
    }
    numbersBoxSelector.appendChild(box);
  }
  // Show second screen
  secondScreenSection.classList.remove("hide");
}

newGameBtn.addEventListener("click", startNewGame);
levelSelector.addEventListener("click", levelChangeValue);
timeSelector.addEventListener("click", timeChangeValue);
