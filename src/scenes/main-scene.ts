import Phaser from "phaser";
import Car from "../objects/car";
import Spawn from "../objects/spawn";
import tilemapResource from "../static/outdoor.json";
import tilesetResource from "../static/tilemap.png";
import texturesAtlas from "../static/textures.json";
import "../static/textures.png";

const scene: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game"
};

export default class GameScene extends Phaser.Scene {
  private cars: Car[] = [];
  private spawns: Spawn[] = [];

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

    this.spawns = [
      new Spawn(this, map, "left_visiting", "left"),
      new Spawn(this, map, "right_visiting", "right")
    ];

    if (this.physics.world.drawDebug) {
      drawPaths(this.add.graphics(), this.spawns);
    }
  }

  public update(time: number, delta: number) {
    const newCars = this.spawns.map(spawn => spawn.spawn(time)).filter(notNull);
    this.cars = this.cars.concat(newCars);

    this.cars = this.cars.filter(car => {
      car.update(time, delta);
      return !car.isDestroyed();
    });
  }
}

function drawPaths(
  graphics: Phaser.GameObjects.Graphics,
  spawns: Spawn[]
): void {
  graphics.lineStyle(3, 0xff0000, 1);
  spawns
    .flatMap(spawn => spawn.spawns())
    .forEach(path => {
      path.draw(graphics);
    });
}

function notNull<T>(value: T | null): value is T {
  return value != null;
}
