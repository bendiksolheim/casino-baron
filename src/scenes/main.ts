import Phaser from "phaser";
import Car from "entities/car";
import Spawn from "entities/spawn";
import paths from "graphics/paths";
import { notNull } from "util/value";
import tilemapResource from "static/outdoor.json";
import tilesetResource from "static/tilemap.png";
import texturesAtlas from "static/textures.json";
import "static/textures.png";
import ParkingLot from "entities/parking-lot";

const scene: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game"
};

export default class GameScene extends Phaser.Scene {
  private cars: Car[] = [];
  private spawns: Spawn[] = [];
  private parkingLot!: ParkingLot;

  constructor() {
    super(scene);
  }

  public preload() {
    this.load.image("tiles", tilesetResource);
    this.load.tilemapTiledJSON("map", tilemapResource);
    this.load.multiatlas("textures", texturesAtlas);
  }

  public create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("city", "tiles");

    map.createStaticLayer("below", tileset, 0, 0);
    map.createStaticLayer("ground", tileset, 0, 0);
    map.createStaticLayer("above", tileset, 0, 0);
    map.createStaticLayer("woods_lights", tileset, 0, 0);

    this.parkingLot = new ParkingLot(this, map);
    this.spawns = [
      new Spawn(this, map, "left", this.parkingLot),
      new Spawn(this, map, "right", this.parkingLot)
    ];

    if (this.physics.world.drawDebug) {
      paths.draw(
        this.add.graphics(),
        this.spawns.flatMap(spawn => spawn.spawns())
      );
    }
  }

  public update(time: number, delta: number) {
    const newCars = this.spawns
      .map(spawn => spawn.spawn(delta))
      .filter(notNull);
    this.cars = this.cars.concat(newCars).filter(car => {
      car.update(time, delta);
      return !car.isDestroyed();
    });
  }
}
