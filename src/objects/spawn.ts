import Phaser from "phaser";
import Car from "../objects/car";
import { getPath } from "../util/tiled";
import { random } from "../util/random";
import { State } from "../fsm/state-machine";

enum Path {
  Enter,
  Exit,
  Normal
}

type PathMapT = {
  [key in Path]: Phaser.Curves.Path;
};

export default class Spawn {
  private scene: Phaser.Scene;
  private elapsed: number = 0;
  private next: number = 0;
  private paths: PathMapT;
  private spawnRate: number = 10;

  constructor(
    scene: Phaser.Scene,
    tilemap: Phaser.Tilemaps.Tilemap,
    prefix: string
  ) {
    this.scene = scene;

    this.paths = {
      [Path.Enter]: getPath(scene, findObject(tilemap, `${prefix}_enter`)),
      [Path.Exit]: getPath(scene, findObject(tilemap, `${prefix}_exit`)),
      [Path.Normal]: getPath(scene, findObject(tilemap, prefix))
    };

    this.setNextSpawn();
  }

  update(time: number, delta: number) {}

  spawn(delta: number) {
    this.elapsed += delta;

    if (this.elapsed >= this.next) {
      this.setNextSpawn();
      if (random() >= 0.5) {
        const car = new Car(this.scene);
        car.stateMachine.add({
          initial: new Enter(car, this.paths[Path.Enter]),
          parked: new Parked(car, amount =>
            this.scene.events.emit("spend", amount)
          ),
          exit: new Exit(car, this.paths[Path.Exit])
        });
        car.stateMachine.changeTo("initial");
        return car;
      } else {
        const car = new Car(this.scene);
        car.stateMachine.add({
          initial: new Exit(car, this.paths[Path.Normal])
        });
        car.stateMachine.changeTo("initial");
        return car;
      }
    } else {
      return null;
    }
  }

  setNextSpawn() {
    this.elapsed = 0;
    const lowerBound = this.spawnRate / 2;
    const upperBound = this.spawnRate + lowerBound;
    this.next = ((upperBound - lowerBound) * random() + lowerBound) * 1000;
  }

  spawns(): Phaser.Curves.Path[] {
    return Object.values(this.paths);
  }
}

const carSpeed = 100;

class Enter implements State {
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

class Parked implements State {
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

  update(time: number, dt: number) {
    this.t += dt;

    if (this.t > 2000) {
      this.car.stateMachine.changeTo("exit");
    }
  }
}

class Exit implements State {
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

function findObject(
  map: Phaser.Tilemaps.Tilemap,
  name: string
): Phaser.GameObjects.GameObject {
  return map.findObject("routes", obj => obj.name === name);
}
