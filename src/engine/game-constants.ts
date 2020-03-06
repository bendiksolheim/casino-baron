function makeGameConstants(factor: number) {
  return {
    gameSpeed: factor,
    carSpeed: 200 * factor,
    timeFactor: 4282 * factor
  };
}

const GameConstants = makeGameConstants(2);

export default GameConstants;
