import { State } from "fsm/state-machine";
import Car from "entities/car/";
import ParkingLot from "entities/parking-lot";
import GameState from "engine/game-state";
import GameConstants from "engine/game-constants";

const carSpeed = GameConstants.carSpeed;

export class Enter implements State {
  private car: Car;
  private path: Phaser.Curves.Path;
  private parkingLot: ParkingLot;
  private t: number = 0;
  private length: number;

  constructor(car: Car, path: Phaser.Curves.Path, parkingLot: ParkingLot) {
    this.car = car;
    this.path = path;
    this.length = path.getLength();
    this.parkingLot = parkingLot;
  }

  enter() {}

  exit() {}

  update(time: number, dt: number) {
    const elapsedSeconds = dt / 1000;
    const distance = (carSpeed * elapsedSeconds) / this.length;
    this.t += distance;
    const newLocation = this.path.getPoint(this.t);
    if (newLocation == null) {
      if (this.parkingLot.hasFreeSlots()) {
        this.car.stateMachine.changeTo("parked");
      } else {
        this.car.stateMachine.changeTo("exit");
      }
    } else {
      this.car.sprite.setPosition(newLocation.x, newLocation.y);
    }
  }
}

export class Parked implements State {
  private car: Car;
  private spend: (amount: number) => void;
  private park: () => void;
  private leave: () => void;
  private t: number = 0;

  constructor(car: Car, scene: Phaser.Scene) {
    this.car = car;
    this.spend = amount =>
      GameState.update(state => ({
        ...state,
        balance: state.balance + amount
      }));
    this.park = () => scene.events.emit("park", car);
    this.leave = () => scene.events.emit("leave", car);
  }

  enter() {
    this.park();
  }

  exit() {
    this.spend(10);
    this.leave();
  }

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
