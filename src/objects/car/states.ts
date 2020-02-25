import { State } from "../../fsm/state-machine";
import Car from "../car/";

const carSpeed = 100;

export class Enter implements State {
  private car: Car;
  private path: Phaser.Curves.Path;
  private t: number = 0;
  private length: number;

  constructor(car: Car, path: Phaser.Curves.Path) {
    this.car = car;
    this.path = path;
    this.length = path.getLength();
  }

  enter() {}

  exit() {}

  update(time: number, dt: number) {
    const elapsedSeconds = dt / 1000;
    const distance = (carSpeed * elapsedSeconds) / this.length;
    this.t += distance;
    const newLocation = this.path.getPoint(this.t);
    if (newLocation == null) {
      this.car.stateMachine.changeTo("parked");
    } else {
      this.car.sprite.setPosition(newLocation.x, newLocation.y);
    }
  }
}

export class Parked implements State {
  private car: Car;
  private spend: (amount: number) => void;
  private t: number = 0;

  constructor(car: Car, spend: (amount: number) => void) {
    this.car = car;
    this.spend = spend;
  }

  enter() {
    this.spend(10);
  }

  exit() {}

  update(time: number, dt: number) {
    this.t += dt;

    if (this.t > 2000) {
      this.car.stateMachine.changeTo("exit");
    }
  }
}

export class Exit implements State {
  private car: Car;
  private path: Phaser.Curves.Path;
  private t: number = 0;
  private length: number;

  constructor(car: Car, path: Phaser.Curves.Path) {
    this.car = car;
    this.path = path;
    this.length = path.getLength();
  }

  enter() {}

  exit() {}

  update(time: number, dt: number) {
    const elapsedSeconds = dt / 1000;
    const distance = (carSpeed * elapsedSeconds) / this.length;
    this.t += distance;
    const newLocation = this.path.getPoint(this.t);
    if (newLocation == null) {
      this.car.destroy();
    } else {
      this.car.sprite.setPosition(newLocation.x, newLocation.y);
    }
  }
}
