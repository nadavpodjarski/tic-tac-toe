import { Square } from "./Square";
import { Observer } from "./Observer.interface";

export class DisplayValues implements Observer {
  update = (board) => {
    const squares = document.querySelectorAll(".square-button");
    const squaresFlatMap = board.squares.flatMap((sq: Square) => sq);
    squaresFlatMap.forEach((value, i) => {
      squares[i].innerHTML = value;
    });
  };
}
