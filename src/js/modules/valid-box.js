"use strict";
const isDuplicatesValues = (array) => {
  let arrayFiltering = array.filter((elm) => elm !== "");
  let checkUniques = new Set(arrayFiltering);
  return arrayFiltering.length !== checkUniques.size;
};

const rowGood = (board, row) => {
  let rowCheck = isDuplicatesValues(board[row]);
  if (rowCheck) return false;
  return true;
};

const columnGood = (board, col) => {
  let columnSelect = [];
  for (let row = 0; row < 9; row++) {
    columnSelect[row] = board[row][col];
  }
  let columnCheck = isDuplicatesValues(columnSelect);
  if (columnCheck) return false;
  return true;
};

const helperBoxes = (num) => {
  if (num >= 0 && num <= 2) return 0;
  if (num >= 3 && num <= 5) return 3;
  return 6;
};

const boxesGood = (board, row, col) => {
  let selectRow = helperBoxes(row);
  let selectCol = helperBoxes(col);

  let boxesCheck = [];
  for (let i = selectRow; i < selectRow + 3; i++) {
    for (let j = selectCol; j < selectCol + 3; j++) {
      boxesCheck.push(board[i][j]);
    }
    if ((i + 1) % 3 === 0) {
      let tempArray = boxesCheck;
      tempArray = isDuplicatesValues(tempArray);
      if (tempArray) return false;
    }
  }
  return true;
};

const isValidBox = (board, row, col) => {
  return rowGood(board, row) && columnGood(board, col) && boxesGood(board, row, col);
};
export { isValidBox };
