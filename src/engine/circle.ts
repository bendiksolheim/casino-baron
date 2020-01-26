import VelocitySprite from "./velocity-sprite";
import { World, InputEvent } from "./index";

function updateCircle(
  sprite: VelocitySprite,
  world: World,
  input: InputEvent,
  delta: number
): void {
  const newX = sprite.x + sprite.vx * delta;
  const newY = sprite.y + sprite.vy * delta;

  if (newY < world.y) {
    sprite.vy *= -1;
  } else if (newX < world.x) {
    sprite.vx *= -1;
  } else if (newX + sprite.width > world.width) {
    sprite.vx *= -1;
  } else if (newY + sprite.height > world.height) {
    sprite.vy *= -1;
  } else {
    sprite.x = newX;
    sprite.y = newY;
  }
}

export default updateCircle;
