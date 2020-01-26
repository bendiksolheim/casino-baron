import * as PIXI from "pixi.js";
import AbstractScene from "./scene";

export type SceneSettings = {
  name: string;
  gameScene: AbstractScene;
};

export class Engine {
  private scenes: SceneSettings[];
  private app: PIXI.Application;
  private currentScene: SceneSettings;

  constructor(app: PIXI.Application, scenes: SceneSettings[]) {
    this.app = app;
    this.scenes = scenes;
    this.scenes.forEach((scene: SceneSettings) => {
      scene.gameScene.init(this.app, this.sceneSwitcher);
    });

    this.currentScene = scenes[0];

    this.setupScene(this.currentScene);
  }

  sceneSwitcher = (sceneName: string) => {
    const nextScene = this.scenes.find((scene: SceneSettings) => {
      return scene.name === sceneName;
    });

    if (nextScene) {
      this.setupScene(nextScene);
      this.currentScene = nextScene;
    } else {
      console.error(`Scene '${sceneName}' not found`);
    }
  };

  setupScene(scene: SceneSettings) {
    this.app.stage.removeChildren();
    const sceneContainer = new PIXI.Container();
    this.app.stage.addChild(sceneContainer);

    const gameScene: AbstractScene = scene.gameScene;

    gameScene.setup(sceneContainer, PIXI.Loader.shared);
  }

  update(delta: number) {
    this.currentScene.gameScene.update(delta);
  }

  mount(element: HTMLElement): void {
    element.appendChild(this.app.view);
  }
}
