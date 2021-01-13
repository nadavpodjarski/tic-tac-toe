export class GameStatus {
  checkAxesWin = (board) => {
    const { x, y, value } = board.currentPosition;
    if (value) {
      const isRowWin = board.squares[x].every((sq) => sq === value);
      if (isRowWin) return { value };

      const isColWin = board.squares.every((row) => {
        return row[y] === value;
      });
      if (isColWin) return { value };
    }
    return null;
  };

  checkCrossesWin = (board) => {
    const { value } = board.currentPosition;
    if (value) {
      const isTopLeft = board.squares.every((row, i) => {
        return board.squares[i][i] === value;
      });
      if (isTopLeft) return { value };

      const isTopRight = board.squares.every((row, y) => {
        const index = row.length - 1 - y;
        return board.squares[index][y] === value;
      });
      if (isTopRight) return { value };
    }
    return null;
  };

  checkWin = (board) => {
    const isAxe = this.checkAxesWin(board);
    const isCross = this.checkCrossesWin(board);
    board.winner = isAxe?.value || isCross?.value;
  };

  update(board) {
    this.checkWin(board);
    const status = document.querySelector(".status");
    if (board.winner) {
      status.innerHTML = `The Winner is ${board.winner}`;
    } else {
      const nextPlayer = board.isXnext ? "O" : "X";
      status.innerHTML = `Next Player is ${nextPlayer}`;
    }
  }
}
