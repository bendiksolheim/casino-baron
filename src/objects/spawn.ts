import Phaser from "phaser";
import Car, { CarType } from "../objects/car";
import { getPath } from "../util/tiled";
import { random, randomFrom } from "../util/random";

type PathMapT = {
  [key: string]: Phaser.Curves.Path;
};

export default class Spawn {
  private scene: Phaser.Scene;
  private tilemap: Phaser.Tilemaps.Tilemap;
  private lastSpawned: number;
  private next: number;
  private paths: PathMapT = {};

  constructor(
    scene: Phaser.Scene,
    tilemap: Phaser.Tilemaps.Tilemap,
    prefix: string
  ) {
    this.scene = scene;
    this.tilemap = tilemap;

    this.paths["visiting"] = getPath(
      scene,
      findObject(tilemap, `${prefix}_visiting`)
    );
    this.paths["normal"] = getPath(scene, findObject(tilemap, prefix));

    this.lastSpawned = 0;
    this.next = random();
  }

  update(time: number, delta: number) {}

  spawn(time: number) {
    const probability = getProbability((time - this.lastSpawned) / 10000);
    if (probability > this.next) {
      this.lastSpawned = time + 1000;
      this.next = random();
      if (random() >= 0.5) {
        return new Car(this.scene, CarType.Visiting, this.paths["visiting"]);
      } else {
        return new Car(this.scene, CarType.NonVisiting, this.paths["normal"]);
      }
    } else {
      return null;
    }
  }

  spawns(): Phaser.Curves.Path[] {
    return Object.values(this.paths);
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
