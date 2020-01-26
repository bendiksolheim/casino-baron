import * as PIXI from "pixi.js";
import AbstractScene from "../engine/scene";

export default class MenuScene extends AbstractScene {
  setup(sceneContainer: PIXI.Container, loader: PIXI.Loader) {
    const newGame = new PIXI.Text("New Game", {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xffffff,
      align: "center"
    });

    newGame.anchor.set(0.5);
    newGame.x = this.app.screen.width / 2;
    newGame.y = this.app.screen.height / 2;

    newGame.interactive = true;
    newGame.addListener("pointerup", () => {
      this.sceneSwitcher("main");
    });

    sceneContainer.addChild(newGame);
  }

  sceneUpdate(delta: number) {}
}
