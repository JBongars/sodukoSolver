import {
  solve
} from '../solver/classic';
import {
  getBoard,
  setBoard
} from '../scrapper/webdoku';

const run = () => {
  const board = getBoard();
  const result = solve(board);

  console.log({
    board,
    result
  });

  setBoard(result[0]);
}

export default run;
export {
  run
};
