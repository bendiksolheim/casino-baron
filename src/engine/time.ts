import GameState from "engine/game-state";
import GameConstants from "engine/game-constants";

/*
 * Amount of real time milliseconds per game millisecond.
 * Based on the calculation that 30 real life days are 20 in game minutes
 */
const factor = GameConstants.timeFactor;
const millisecondsInDay = 1000 * 60 * 60 * 24;

let time = GameState.get().time;

function tick(ms: number): void {
  time = time + ms * factor;
  GameState.update(state => ({ ...state, time }));
}

function get(): number {
  return time;
}

function getTruncated(): number {
  return time - (time % millisecondsInDay);
}

function getDate(): Date {
  return new Date(time);
}

export default {
  tick,
  get,
  getTruncated,
  getDate
};
