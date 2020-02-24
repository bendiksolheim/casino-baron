import Phaser from "phaser";
import { getPath, findObject, GameObjectWithLocation } from "../../util/phaser";
import { range } from "../../util/array";
import { randomFrom } from "../../util/random";

export default class ParkingLot {
  private slots: GameObjectWithLocation[];
  private taken: boolean[];

  constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
    this.slots = range(0, 10).map(index => findObject(map, `park_${index}`));
    this.taken = range(0, 10).map(_ => false);
  }

  parkRandom() {
    const freeSlots = this.taken.reduce((acc, cur, index) => {
      if (cur) {
        return acc.concat(index);
      } else {
        return acc;
      }
    }, [] as number[]);
    const slot = randomFrom(freeSlots);
  }
}
