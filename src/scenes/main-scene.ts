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

type PhysicsSprite = Phaser.GameObjects.Sprite & {
  body: Phaser.Physics.Arcade.Body;
};

type GameObjectWithLocation = Phaser.GameObjects.GameObject & {
  x: number;
  y: number;
};

export default class GameScene extends Phaser.Scene {
  private world!: Phaser.Physics.Arcade.StaticGroup;
  private carSpawnpoints!: GameObjectWithLocation[];
  private keyboard!: Phaser.Types.Input.Keyboard.CursorKeys;

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

    const ground = map.createStaticLayer("ground", tileset, 0, 0);

    this.keyboard = this.input.keyboard.createCursorKeys();
    this.world = this.physics.add.staticGroup();
  }

  public update() {
    if (random() > carProbability) {
      const spawnIndex = randomFrom([0, 1]);
      const spawn = this.carSpawnpoints[spawnIndex];
      new Car(this, spawn.x, spawn.y, spawnIndex == 0 ? 100 : -100);
    }
  }
}

function carSpawnpoints(
  map: Phaser.Tilemaps.Tilemap
): GameObjectWithLocation[] {
  return [findObject(map, "spawn_left"), findObject(map, "spawn_right")];
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
