import * as PIXI from "pixi.js";
import { Engine, SceneSettings } from "./engine";

export type InputEvent = {
  mouse: { x: number | null; y: number | null };
};

type Resource = { name: string; url: string };
export type Resources = Resource[];

const input: InputEvent = {
  mouse: { x: null, y: null }
};

const start = (
  scenes: SceneSettings[],
  resources: Resources,
  callback: (engine: Engine) => void
): void => {
  const loader = PIXI.Loader.shared;
  loader.add(resources).load(setup);

  function setup() {
    const app = new PIXI.Application({ width: 600, height: 400 });
    const engine = new Engine(app, scenes);

    app.ticker.add(delta => engine.update(delta));

    callback(engine);
  }
};

export default start;
