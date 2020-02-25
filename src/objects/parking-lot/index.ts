import Phaser from "phaser";
import { getPath, findObject, GameObjectWithLocation } from "../../util/phaser";
import { range } from "../../util/array";
import { randomFrom } from "../../util/random";
import Car from "objects/car";

type ParkedCar = Car | null;

export default class ParkingLot {
  private slots: GameObjectWithLocation[];
  private taken: ParkedCar[];

  constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
    this.slots = range(0, 10).map(index => findObject(map, `park_${index}`));
    this.taken = range(0, 10).map(_ => null);

    scene.events.on("park", this.parkRandom, this);
    scene.events.on("leave", this.leave, this);
  }

  hasFreeSlots() {
    return this.taken.some(slot => slot === null);
  }

  parkRandom(car: Car) {
    const freeSlots = this.taken.reduce((acc, parked, index) => {
      if (parked === null) {
        return acc.concat(index);
      } else {
        return acc;
      }
    }, [] as number[]);
    const slot = randomFrom(freeSlots);
    const point = this.slots[slot];
    this.taken[slot] = car;
    car.sprite.setPosition(point.x, point.y);
  }

  leave(car: Car) {
    const slot = this.taken.findIndex(slot => car === slot);
    if (slot >= 0) {
      this.taken[slot] = null;
    }
  }
}
