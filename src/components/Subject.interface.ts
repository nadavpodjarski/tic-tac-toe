import { Observer } from "./Observer.interface";

export class Subject {
  addObserver: (o: Observer) => void;
  removeObserver: (o: Observer) => void;
  notifyObservers: () => void;
}
