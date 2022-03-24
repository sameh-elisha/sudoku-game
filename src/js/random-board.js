const validSudoku = require("./vaild-board.js");

const createRandomBoard = (level) => {
  // Initialize board 9 rows value Array => value = ""
  let board = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => ""));
  let maxItems = 0;
  // Select Level
  if (level === "hard") maxItems = 25;
  else if (level === "medium") maxItems = 30;
  else maxItems = 35;
  // Initialize variables.
  let fieldX = 0;
  let fieldY = 0;
  let countItemsAdded = 0;
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
    if (validSudoku.isValidSudoku(board)) {
      countItemsAdded++;
    } else {
      board[fieldX][fieldY] = temp;
    }
    // Check number of elements added to board.
    lenItems = board.flat().filter((elm) => elm !== "").length;
    if (lenItems >= maxItems) break;
  }
  return board;
};

exports.createRandomBoard = createRandomBoard;
