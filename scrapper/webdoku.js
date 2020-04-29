const {
  range
} = require('../utilities');

// https://nine.websudoku.com/?

const getPositionElem = (x, y) => document.getElementById(`f${x}${y}`);
const getPosition = (x, y) => parseInt(getPositionElem(x, y).value || 0, 10);
const setPosition = (x, y, n) => getPositionElem(x, y).value = n;

const getBoard = () => range(0, 9).map(y => range(0, 9).map(x => getPosition(x, y)));
const setBoard = (board) => board.forEach((row, y) => row.forEach((elem, x) => setPosition(x, y, elem)));

module.exports = {
  getBoard,
  setBoard
};
