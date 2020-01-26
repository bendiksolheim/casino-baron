import * as PIXI from "pixi.js";
import AbstractScene from "../engine/scene";
import VelocitySprite from "../engine/velocity-sprite";
import updateCircle from "../engine/circle";

export default class MainScene extends AbstractScene {
  private balls?: VelocitySprite[];

  setup(sceneContainer: PIXI.Container, loader: PIXI.Loader) {
    this.balls = [
      new VelocitySprite(loader.resources["ball"].texture, 300, 200, 10, -10),
      new VelocitySprite(loader.resources["ball"].texture, 300, 200, 5, 10)
    ];

    this.balls.forEach((ball: VelocitySprite) => sceneContainer.addChild(ball));
  }

  sceneUpdate(delta: number) {
    this.balls?.forEach((ball: any) =>
      updateCircle(ball, this.app.screen, delta)
    );
  }
}
