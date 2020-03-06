import Storage from "./storage";

const key = "gameState";

export interface ListenerT {
  stateChanged: (state: GameStateT) => void;
}

export type GameStateT = {
  balance: number;
  time: number;
};

const initialState: GameStateT = {
  balance: 0,
  time: 946684800000
};

let listeners: ListenerT[] = [];
let gameState = Storage.load(key, initialState);

function listen(listener: ListenerT): void {
  listeners = listeners.concat(listener);
}

function update(updater: (oldState: GameStateT) => GameStateT): void {
  gameState = updater(gameState);
  listeners.forEach(listener => listener.stateChanged(gameState));
}

function get(): GameStateT {
  return gameState;
}

function persist(): void {
  Storage.save(key, gameState);
}

export default {
  listen,
  update,
  get,
  persist
};
