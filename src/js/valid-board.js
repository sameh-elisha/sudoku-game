// Check if array have duplicate value
const isDuplicatesValues = (array) => {
  arrayFiltering = array.filter((elm) => elm !== "");
  let checkUniques = new Set(arrayFiltering);
  if (arrayFiltering.length !== checkUniques.size) return true;
  return false;
};

// Check row is good
const rowGood = (board) => {
  let rowCheck = [];
  for (let i = 0; i < board.length; i++) {
    // Check Rows if has duplicate values
    rowCheck = isDuplicatesValues(board[i]);
    if (rowCheck) return false;
  }
  return true;
};

// Check column is good
const columnGood = (board) => {
  let columnSelect = [];
  for (let i = 0; i < board.length; i++) {
    // Select column && every 3 element in new array
    for (let j = 0; j < 9; j++) {
      columnSelect.push(board[j][i]);
    }
    // Check Columns if has duplicate values
    let columnCheck = isDuplicatesValues(columnSelect);
    if (columnCheck) return false;
    columnSelect = [];
  }
  return true;
};

// Check boxes is good
const boxesGood = (board) => {
  let boxesCheck = [[], [], []];
  let c = 0;
  for (let i = 0; i < board.length; i++) {
    // Select every 3 element in new array
    for (let j = 0; j < 9; j++) {
      if (j % 3 === 0 && j !== 0) c++;
      boxesCheck[c].push(board[i][j]);
    }
    // check every 3 rows is valid
    if ((i + 1) % 3 === 0) {
      for (let j = 0; j < 3; j++) {
        let tempArray = boxesCheck[j];
        tempArray = isDuplicatesValues(tempArray);
        if (tempArray) return false;
      }
      boxesCheck = [[], [], []];
    }
    c = 0;
  }
  return true;
};

const isValidSudoku = (board) => {
  return rowGood(board) && columnGood(board) && boxesGood(board);
};

exports.isValidSudoku = isValidSudoku;
