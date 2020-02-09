import Phaser from "phaser";

export default class Car {
  private scene: Phaser.Scene;
  private sprite: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, velocity: number) {
    this.scene = scene;

    this.sprite = scene.physics.add
      .sprite(x, y, "textures", "car_yellow.png")
      .setVelocityX(velocity);
  }

  update() {}

  destroy() {
    this.sprite.destroy();
  }
}
