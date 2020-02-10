import * as Phaser from "phaser";
import Car from "../objects/car";
import tilemapResource from "../static/outdoor.json";
import tilesetResource from "../static/tilemap.png";
import texturesAtlas from "../static/textures.json";
import "../static/textures.png";
import { random, randomFrom } from "../util/random";

const carProbability = 1 - 1 / 120;

const scene: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game"
};

type SpawnPoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type GameObjectWithLocation = Phaser.GameObjects.GameObject & {
  x: number;
  y: number;
};

export default class GameScene extends Phaser.Scene {
  private carSpawnpoints!: SpawnPoint[];

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
    this.carSpawnpoints = carSpawnpoints(map);
    const tileset = map.addTilesetImage("city", "tiles");

    map.createStaticLayer("below", tileset, 0, 0);
    map.createStaticLayer("ground", tileset, 0, 0);
    map.createStaticLayer("above", tileset, 0, 0);
  }

  public update() {
    if (random() > carProbability) {
      const spawn = randomFrom(this.carSpawnpoints);
      new Car(this, spawn.x, spawn.y, spawn.vx);
    }
  }
}

function carSpawnpoints(map: Phaser.Tilemaps.Tilemap): SpawnPoint[] {
  return [
    { vy: 0, vx: 100, ...findObject(map, "spawn_left") },
    { vy: 0, vx: -100, ...findObject(map, "spawn_right") }
  ];
}

function findObject(
  map: Phaser.Tilemaps.Tilemap,
  name: string
): GameObjectWithLocation {
  return map.findObject(
    "car_spawns",
    obj => obj.name === name
  ) as GameObjectWithLocation;
}
