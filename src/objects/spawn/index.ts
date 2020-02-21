import Phaser from "phaser";
import Car from "../car";
import { getPath } from "../../util/tiled";
import { random, randomAround } from "../../util/random";
import { findObject } from "../../util/phaser";
import { Enter, Parked, Exit } from "../car/states";

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
  private spawnRate: number = 10000;

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

    this.next = randomAround(this.spawnRate);
  }

  spawn(delta: number) {
    this.elapsed += delta;

    if (this.elapsed >= this.next) {
      this.elapsed = 0;
      this.next = randomAround(this.spawnRate);
      const probability = random();
      const car = spawnCar(probability, this.paths, this.scene);
      car.stateMachine.changeTo("initial");
      return car;
    } else {
      return null;
    }
  }

  spawns(): Phaser.Curves.Path[] {
    return Object.values(this.paths);
  }
}

function spawnCar(
  probability: number,
  paths: PathMapT,
  scene: Phaser.Scene
): Car {
  if (probability >= 0.5) {
    const car = new Car(scene);
    car.stateMachine.add({
      initial: new Enter(car, paths[Path.Enter]),
      parked: new Parked(car, amount => scene.events.emit("spend", amount)),
      exit: new Exit(car, paths[Path.Exit])
    });
    return car;
  } else {
    const car = new Car(scene);
    car.stateMachine.add({
      initial: new Exit(car, paths[Path.Normal])
    });
    return car;
  }
}
