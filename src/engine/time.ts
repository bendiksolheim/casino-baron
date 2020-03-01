import GameState from "engine/game-state";

/*
 * Amount of real time milliseconds per game millisecond.
 * Based on the calculation that 30 real life days are 20 in game minutes
 */
const factor = 2141;

let time = GameState.get().time;

function tick(ms: number): void {
  time = time + ms * factor;
}

function get(): number {
  return factor;
}

function getDate(): Date {
  return new Date(time);
}

export default {
  tick,
  get,
  getDate
};
