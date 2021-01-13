import { Subject } from "./Subject.interface";
import { Observer } from "./Observer.interface";
import { Square } from "./Square";

export class Board implements Subject {
  private squares: Square[][];
  private observers: Observer[] = [];

  private isXnext: boolean = false;
  private winner = null;
  private currentPosition = { x: 0, y: 0, value: null };

  create = (size: number) => {
    if (size > 6) size = 6;
    this.squares = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));

    const board = document.querySelector(".board");

    for (let i = 0; i < size; i++) {
      const row = document.createElement("div");
      row.className = "row";
      for (let j = 0; j < size; j++) {
        const sq = document.createElement("button");
        sq.className = `square-button`;
        sq.innerHTML = this.squares[i][j];
        sq.addEventListener("click", this.update(i, j));
        row.appendChild(sq);
      }
      board.appendChild(row);
    }
    this.notifyObservers();
  };

  update = (x: number, y: number) => {
    return () => {
      if (!!this.squares[x][y] || this.winner) return;
      this.isXnext = !this.isXnext;
      const value = this.isXnext ? "X" : "O";
      this.squares[x][y] = value;
      this.currentPosition = { x, y, value };
      this.notifyObservers();
    };
  };

  addObserver = (observer: Observer) => {
    this.observers.push(observer);
  };

  removeObserver = (observer: Observer) => {
    const index = this.observers.indexOf(observer);
    this.observers.splice(index, 1);
  };

  notifyObservers = () => {
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  };
}
