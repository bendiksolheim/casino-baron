import GameState, { GameStateT } from "engine/game-state";

function getMonth(time: number): number {
  return new Date(time).getMonth();
}

class Expenses {
  month: number;

  constructor() {
    this.month = getMonth(GameState.get().time);
  }

  newMonth(): void {
    GameState.update(state => ({ ...state, balance: state.balance - 100 }));
  }

  stateChanged(newState: GameStateT): void {
    const newMonth = getMonth(newState.time);
    if (newMonth != this.month) {
      this.month = newMonth;
      this.newMonth();
    }
  }
}

const expenses = new Expenses();

GameState.listen(expenses);

export default expenses;
