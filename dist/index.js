(function () {
  'use strict';

  const range = (start, end, step = 1) => Array.from({
    length: (end - start) / step
  }, (_, i) => start + i * step);

  const isPositionEmpty = (board, x, y, _n) => board[y][x] === 0;
  const isPositionSquareValid = (board, x, y, n) => {
    const getAxisRange = (i) => {
      const start = i - (i % 3);
      return range(start, start + 3);
    };

    const positions = getAxisRange(x).map(
      elemX => getAxisRange(y).map(
        elemY => [elemX, elemY]
      )
    ).reduce(
      (a, elem) => [...a, ...elem], []
    );

    return positions.filter(([x, y]) => board[y][x] === n) < 1
  };
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
    };
    helper();

    return results;
  };

  // https://nine.websudoku.com/?

  const getPositionElem = (x, y) => document.getElementById(`f${x}${y}`);
  const getPosition = (x, y) => parseInt(getPositionElem(x, y).value || 0, 10);
  const setPosition = (x, y, n) => getPositionElem(x, y).value = n;

  const getBoard = () => range(0, 9).map(y => range(0, 9).map(x => getPosition(x, y)));
  const setBoard = (board) => board.forEach((row, y) => row.forEach((elem, x) => setPosition(x, y, elem)));

  const run = () => {
    const board = getBoard();
    const result = solve(board);

    console.log({
      board,
      result
    });

    setBoard(result[0]);
  };

  run();

}());
