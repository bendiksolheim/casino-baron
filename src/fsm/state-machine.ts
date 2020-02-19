export interface State {
  enter: () => void;
  update: (time: number, dt: number) => void;
}

type StateMapT = {
  [key: string]: State;
};

class EmptyState implements State {
  enter() {}
  update(time: number, dt: number) {}
}

export default class StateMachine {
  private states: StateMapT;
  private current: State;

  constructor() {
    this.states = {};
    this.current = new EmptyState();
  }

  add(states: StateMapT) {
    this.states = states;
  }

  update(time: number, dt: number) {
    this.current.update(time, dt);
  }

  changeTo(state: string) {
    this.current = this.states[state];
    this.current.enter();
  }
}
