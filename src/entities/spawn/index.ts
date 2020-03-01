import Phaser from "phaser";
import Car from "entities/car";
import { getPath } from "util/phaser";
import { random, randomAround } from "util/random";
import { findObject } from "util/phaser";
import { Enter, Parked, Exit } from "entities/car/states";
import ParkingLot from "entities/parking-lot";

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
  private parkingLot: ParkingLot;
  private spawnRate: number = 10_000;

  constructor(
    scene: Phaser.Scene,
    tilemap: Phaser.Tilemaps.Tilemap,
    prefix: string,
    parkingLot: ParkingLot
  ) {
    this.scene = scene;
    this.parkingLot = parkingLot;

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
      const car = spawnCar(
        probability,
        this.paths,
        this.scene,
        this.parkingLot
      );
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
  scene: Phaser.Scene,
  parkingLot: ParkingLot
): Car {
  if (probability >= 0.5) {
    const car = new Car(scene);
    car.stateMachine.add({
      initial: new Enter(car, paths[Path.Enter], parkingLot),
      parked: new Parked(car, scene),
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
