const isPositionEmpty = (board, x, y, _n) => board[y][x] === 0;
const isPositionSquareValid = (board, x, y, n) => {
  const getAxisRange = (i) => {
    const start = i - (i % 3);
    return range(start, start + 3);
  }

  const positions = getAxisRange(x).map(
    elemX => getAxisRange(y).map(
      elemY => [elemX, elemY]
    )
  ).reduce(
    (a, elem) => [...a, ...elem], []
  );

  return positions.filter(([x, y]) => board[y][x] === n) < 1
}
const isPositionHorizontalValid = (board, _x, y, n) => board[y].filter((elem) => elem === n).length < 1;
const isPositionVerticalValid = (board, x, _y, n) => board.filter((elem) => elem[x] === n).length < 1;

const isPositionValid = (board, x, y, n) =>
  isPositionHorizontalValid(board, x, y, n) &&
  isPositionVerticalValid(board, x, y, n) &&
  isPositionSquareValid(board, x, y, n);

const solve = (initialBoard) => {
  const board = JSON.parse(JSON.stringify(initialBoard));
  const results = [];

  const helper = () => {
    var x, y, n;

    for (x = 0; x < 9; x++) {
      for (y = 0; y < 9; y++) {
        if (!isPositionEmpty(board, x, y)) {
          continue;
        }
        for (n = 1; n < 10; n++) {
          if (isPositionValid(board, x, y, n)) {
            board[y][x] = n;
            if (helper()) return board;
            board[y][x] = 0;
          }
        }
        return false;
      }
    }
    if (results.findIndex(elem => JSON.stringify(elem) === JSON.stringify(board)) < 0) {
      results.push(JSON.parse(JSON.stringify(board)));

      return false;
    }
    return true;
  }
  helper();

  return results;
}

export default solve;
export {
  solve
};
