import { World, InputEvent } from "./engine";

type CircleState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  sprite: string;
};

class Circle {
  state: CircleState;
  sprite?: PIXI.Sprite;

  constructor(x: number, y: number, vx: number, vy: number, sprite: string) {
    this.state = { x, y, vx, vy, sprite };
  }

  setSprite(sprite: PIXI.Sprite) {
    this.sprite = sprite;
    this.sprite.x = this.state.x;
    this.sprite.y = this.state.y;
  }

  update(world: World, input: InputEvent, delta: number): void {
    const state = this.state;
    const sprite = this.sprite!;

    sprite.x += state.vx * delta;
    sprite.y += state.vy * delta;
    if (sprite.y < world.y) {
      state.vy *= -1;
    } else if (sprite.x < world.x) {
      state.vx *= -1;
    } else if (sprite.x + sprite.width > world.width) {
      state.vx *= -1;
    } else if (sprite.y + sprite.height > world.height) {
      state.vy *= -1;
    }
  }

  render(): void {
    const state = this.state;
  }
}

export default Circle;
