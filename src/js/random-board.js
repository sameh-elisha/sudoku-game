const validSudoku = require("./valid-board.js");
const solverSudoku = require("./solve.js");

// Create board 9*9 with random 10 element
const createRandomBoard = () => {
  // Initialize board 9 rows value Array => value = ""
  let board = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => ""));
  let maxItems = 10;
  // Initialize variables.
  let fieldX = 0;
  let fieldY = 0;
  let lenItems = 0;
  let temp = "";
  while (true) {
    // random number between 0 and 8
    fieldX = Math.floor(Math.random() * 9);
    fieldY = Math.floor(Math.random() * 9);
    // random number between 1 and 9
    value = Math.floor(Math.random() * 9) + 1;
    // Check value is valid.
    temp = board[fieldX][fieldY];
    board[fieldX][fieldY] = value + "";
    if (!validSudoku.isValidSudoku(board)) board[fieldX][fieldY] = temp;
    // Check number of elements added to board.
    lenItems = board.flat().filter((elm) => elm !== "").length;
    if (lenItems >= maxItems) break;
  }
  board = solverSudoku.solveSudoku(board);
  return board;
};

// Set random element in solved board by value ""
const clearFields = (solvedBoard, len) => {
  var newBoard = solvedBoard.map(function (arr) {
    return [...arr];
  });
  let maxItems = len;
  let fieldX = 0;
  let fieldY = 0;
  let lenItems = 0;
  while (true) {
    fieldX = Math.floor(Math.random() * 9);
    fieldY = Math.floor(Math.random() * 9);
    newBoard[fieldX][fieldY] = "";
    lenItems = newBoard.flat().filter((elm) => elm !== "").length;
    if (lenItems <= maxItems) break;
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
  let [newBoard, solvedBoard] = clearFields(createRandomBoard(), lenElement);
  return [newBoard, solvedBoard];
};

// console.log(selectDifficulty("easy"));

exports.createRandomBoard = createRandomBoard;
