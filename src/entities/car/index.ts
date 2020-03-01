import Phaser from "phaser";
import StateMachine from "fsm/state-machine";

export default class Car {
  stateMachine: StateMachine = new StateMachine();
  sprite: Phaser.GameObjects.Sprite;
  private destroyed: boolean = false;

  constructor(scene: Phaser.Scene) {
    this.sprite = scene.physics.add.sprite(0, 0, "textures", "car_yellow.png");
  }

  update(time: number, delta: number) {
    this.stateMachine.update(time, delta);
  }

  destroy() {
    this.sprite.destroy();
    this.destroyed = true;
  }

  isDestroyed(): boolean {
    return this.destroyed;
  }
}
