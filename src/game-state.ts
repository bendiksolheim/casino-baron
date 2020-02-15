import Storage from "./storage";

const key = "gameState";

export type GameState = {
  balance: number;
};

const initialState: GameState = {
  balance: 1000
};

let gameState = Storage.load(key, initialState);

function update(updater: (oldState: GameState) => GameState): void {
  gameState = updater(gameState);
  Storage.save(key, gameState);
}

function get(): GameState {
  return gameState;
}

export default {
  update,
  get
};
