import Phaser from "phaser";
import Car from "../objects/car";
import tilemapResource from "../static/outdoor.json";
import tilesetResource from "../static/tilemap.png";
import texturesAtlas from "../static/textures.json";
import "../static/textures.png";
import { random, randomFrom } from "../util/random";
import { getPath } from "../util/tiled";

enum VisitingCar {
  Left,
  Right
}

enum NonVisitingCar {
  Left,
  Right
}

const carProbability = 1 - 1 / 120;

const scene: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game"
};

export default class GameScene extends Phaser.Scene {
  private visitingPaths: Map<VisitingCar, Phaser.Curves.Path> = new Map();
  private nonVisitingPaths: Map<NonVisitingCar, Phaser.Curves.Path> = new Map();
  private cars: Car[] = [];

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

    this.visitingPaths.set(
      VisitingCar.Left,
      getPath(this, findObject(map, "left_route"))
    );
    this.visitingPaths.set(
      VisitingCar.Right,
      getPath(this, findObject(map, "right_route"))
    );

    if (this.physics.world.drawDebug) {
      const graphics = this.add.graphics();
      graphics.lineStyle(3, 0xff0000, 1);
      this.visitingPaths.get(VisitingCar.Left)?.draw(graphics);
      this.visitingPaths.get(VisitingCar.Right)?.draw(graphics);
    }
  }

  public update(time: number, delta: number) {
    if (random() > carProbability) {
      const start = randomFrom([VisitingCar.Left, VisitingCar.Right]);
      const path = this.visitingPaths.get(start)!;
      this.cars.push(new Car(this, path));
    }

    this.cars = this.cars.filter(car => {
      car.update(time, delta);
      return !car.isDestroyed();
    });
  }
}

function findObject(
  map: Phaser.Tilemaps.Tilemap,
  name: string
): Phaser.GameObjects.GameObject {
  return map.findObject("routes", obj => obj.name === name);
}
