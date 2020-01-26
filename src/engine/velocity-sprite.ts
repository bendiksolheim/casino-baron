import { Sprite, Texture } from "pixi.js";

type Velocity = {
  vx: number;
  vy: number;
  set: (vx: number, vy: number) => void;
};

class VelocitySprite extends Sprite {
  velocity: Velocity;

  constructor(texture: Texture, x: number, y: number, vx: number, vy: number) {
    super(texture);

    this.position.set(x, y);

    this.velocity = {
      vx: vx,
      vy: vy,
      set: (vx, vy) => {
        this.velocity.vx = vx;
        this.velocity.vy = vy;
      }
    };
  }

  get vx(): number {
    return this.velocity.vx;
  }

  set vx(vx: number) {
    this.velocity.vx = vx;
  }

  get vy(): number {
    return this.velocity.vy;
  }

  set vy(vy: number) {
    this.velocity.vy = vy;
  }
}

export default VelocitySprite;
