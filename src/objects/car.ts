import Phaser from "phaser";

const carSpeed = 1 / 10000;

export enum CarType {
  Visiting,
  NonVisiting
}

export default class Car {
  private scene: Phaser.Scene;
  private type: CarType;
  private path: Phaser.Curves.Path;
  private t: number = 0;
  private sprite: Phaser.GameObjects.Sprite;
  private destroyed: boolean = false;

  constructor(scene: Phaser.Scene, type: CarType, path: Phaser.Curves.Path) {
    this.scene = scene;
    this.type = type;
    this.path = path;

    const start = path.getStartPoint();

    this.sprite = scene.physics.add.sprite(
      start.x,
      start.y,
      "textures",
      "car_yellow.png"
    );
  }

  update(time: number, delta: number) {
    this.t = this.t + carSpeed * delta;
    const newLocation = this.path.getPoint(this.t);
    if (newLocation == null) {
      this.destroy();
    } else {
      this.sprite.setPosition(newLocation.x, newLocation.y);
    }
  }

  destroy() {
    this.sprite.destroy();
    this.destroyed = true;
  }

  isDestroyed(): boolean {
    return this.destroyed;
  }

  isVisiting(): boolean {
    return this.type === CarType.Visiting;
  }
}
