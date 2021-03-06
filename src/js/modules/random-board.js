/*
How it Work?
1- Set 10 valid random numbers.
2- Try solve board.
3- Is board solved, set random value in solved board empty value.
4- Is board can't be solved do step 1. 
*/

"use strict";
// const solverSudoku = import("./solve-board.js.js");
import { solveSudoku } from "./solver-board.js";
import { isValidBox } from "./valid-box.js";

// Create board 9*9 with random 10 element
const createRandomBoard = () => {
  // Initialize board 9 rows value Array => value = ""
  let board = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => ""));
  let maxItems = 10;
  // Initialize variables.
  let row = 0;
  let col = 0;
  let value = 0;
  let lenItems = 0;
  let temp = "";
  let x = 0;
  while (true) {
    // random number between 0 and 8
    row = Math.floor(Math.random() * 9);
    col = Math.floor(Math.random() * 9);
    // random number between 1 and 9
    value = Math.floor(Math.random() * 9) + 1;
    // Check value is valid.
    temp = board[row][col];
    board[row][col] = value + "";
    if (!isValidBox(board, row, col)) board[row][col] = temp;
    // Check number of elements added to board.
    lenItems = board.flat().filter((elm) => elm !== "").length;
    if (lenItems >= maxItems) break;
  }
  // board = solverSudoku.solveSudoku(board);
  return board;
};

// Set random element in solved board by value ""
const clearFields = (solvedBoard, len) => {
  let newBoard = solvedBoard.map((arr) => {
    return [...arr];
  });
  let maxItems = len;
  let row = 0;
  let col = 0;
  let lenItems = 0;
  while (true) {
    row = Math.floor(Math.random() * 9);
    col = Math.floor(Math.random() * 9);
    if (newBoard[row][col] !== "") {
      newBoard[row][col] = "";
      lenItems = newBoard.flat().filter((elm) => elm !== "").length;
      if (lenItems <= maxItems) break;
    }
  }
  return [newBoard, solvedBoard];
};

// Return board with different levels && solved board;
const selectDifficulty = (level) => {
  let lenElement = 0;
  if (level === "hard") {
    lenElement = 25;
  } else if (level === "medium") {
    lenElement = 30;
  } else {
    lenElement = 35;
  }
  let newBoard, solvedBoard;
  while (true) {
    try {
      [newBoard, solvedBoard] = clearFields(solveSudoku(createRandomBoard()), lenElement);
      break;
    } catch {}
  }
  return [newBoard, solvedBoard];
};

export { selectDifficulty };
// selectDifficulty("easy");

// exports.selectDifficulty = selectDifficulty;
