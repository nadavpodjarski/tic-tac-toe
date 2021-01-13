import { Board } from "./components/DisplayBoard";
import { DisplayValues } from "./components/DisplayValues";
import { GameStatus } from "./components/GameStatus";
import "./game.css";

const board = new Board();
const displayValue = new DisplayValues();
const gameStatus = new GameStatus();

board.addObserver(displayValue);
board.addObserver(gameStatus);

board.create(3);
