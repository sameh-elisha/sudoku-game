const validSudoku = require("./valid-board.js");

let possibilities = [];
const setNumber = (hor, ver, oldValue, board) => {
  if (oldValue === "") oldValue = 0;
  oldValue = parseInt(oldValue);
  for (let i = oldValue + 1; i <= 9; i++) {
    board[hor][ver] = i + "";
    if (validSudoku.isValidSudoku(board)) {
      possibilities.push([hor, ver]);
      return;
    }
  }
  board[hor][ver] = "";
  if (possibilities.length > 0) {
    let [felidX, felidY] = possibilities.pop();
    setNumber(felidX, felidY, board[felidX][felidY], board);
    setNumber(hor, ver, board[hor][ver], board);
  } else {
    return "Board is invalid.";
  }
};

const solveSudoku = (board) => {
  let check;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === "") {
        setNumber(i, j, "", board);
        if (check === "Board is invalid.") return check;
      }
    }
  }
  return board;
};

exports.solveSudoku = solveSudoku;
