import Phaser from "phaser";
import Car, { CarType } from "../objects/car";
import { getPath } from "../util/tiled";
import { random, randomFrom } from "../util/random";

export default class Spawn {
  private scene: Phaser.Scene;
  private tilemap: Phaser.Tilemaps.Tilemap;
  private visiting: Phaser.Curves.Path;
  private nonVisiting: Phaser.Curves.Path;
  private lastSpawned: number;
  private next: number;

  constructor(
    scene: Phaser.Scene,
    tilemap: Phaser.Tilemaps.Tilemap,
    visiting: string,
    nonVisiting: string
  ) {
    this.scene = scene;
    this.tilemap = tilemap;

    this.visiting = getPath(scene, findObject(tilemap, visiting));
    this.nonVisiting = getPath(scene, findObject(tilemap, nonVisiting));

    this.lastSpawned = 0;
    this.next = random();
  }

  update(time: number, delta: number) {}

  spawn(time: number) {
    const probability = getProbability((time - this.lastSpawned) / 10000);
    if (probability > this.next) {
      this.lastSpawned = time + 1000;
      this.next = random();
      const path = randomFrom([
        { type: CarType.Visiting, path: this.visiting },
        { type: CarType.NonVisiting, path: this.nonVisiting }
      ]);
      return new Car(this.scene, path.type, path.path);
    } else {
      return null;
    }
  }

  spawns(): Phaser.Curves.Path[] {
    return [this.visiting, this.nonVisiting];
  }
}

function getProbability(x: number) {
  return 1 + Math.cos((Math.PI / 2) * x - Math.PI);
}

function findObject(
  map: Phaser.Tilemaps.Tilemap,
  name: string
): Phaser.GameObjects.GameObject {
  return map.findObject("routes", obj => obj.name === name);
}
