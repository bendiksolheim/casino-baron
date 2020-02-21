import Phaser from "phaser";

function draw(
  graphics: Phaser.GameObjects.Graphics,
  paths: Phaser.Curves.Path[]
): void {
  graphics.lineStyle(3, 0xff0000, 1);
  paths.forEach(path => {
    path.draw(graphics);
  });
}

export default {
  draw
};
