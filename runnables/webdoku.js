const soduko = require('../solver/classic');
const scrapper = require('./scrapper/websudoku');

module.exports = function () {
  const {
    getBoard,
    setBoard
  } = scrapper();

  const {
    solve
  } = soduko();

  const board = getBoard();
  const result = solve(board);

  console.log({
    board,
    result
  });

  setBoard(result[0]);
}
