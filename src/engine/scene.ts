import * as PIXI from "pixi.js";

interface GameScene {
  sceneUpdate(delta: number): void;
}

abstract class AbstractScene implements GameScene {
  protected app!: PIXI.Application;
  protected sceneSwitcher!: (sceneName: string) => void;
  protected sceneContainer!: PIXI.Container;

  init(
    app: PIXI.Application,
    sceneSwitcher: (sceneName: string) => void
  ): void {
    this.app = app;
    this.sceneSwitcher = sceneSwitcher;
  }

  abstract setup(sceneContainer: PIXI.Container, loader: PIXI.Loader): void;

  abstract sceneUpdate(delta: number): void;

  update(delta: number): void {
    this.sceneUpdate(delta);
  }
}

export default AbstractScene;
