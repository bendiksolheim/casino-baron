import * as PIXI from "pixi.js";

export type InputEvent = {
  mouse: { x: number | null; y: number | null };
};

export type World = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type LoadFunction = (resources: any, app: PIXI.Application) => any;

export type UpdateFunction = (
  state: any,
  world: World,
  input: InputEvent,
  delta: number
) => void;

type StartFunction = () => void;
type Resource = { name: string; url: string };
export type Resources = Resource[];
type RunFunction = (
  resources: Resources,
  load: LoadFunction,
  update: UpdateFunction
) => Promise<HTMLCanvasElement>;

const input: InputEvent = {
  mouse: { x: null, y: null }
};

const run: RunFunction = async (resources, load, update) => {
  const promise = new Promise<HTMLCanvasElement>((resolve, reject) => {
    const app = new PIXI.Application({ width: 600, height: 400 });
    const world = {
      x: 0,
      y: 0,
      width: app.view.width,
      height: app.view.height
    };

    let state: any = null;

    app.loader.add(resources).load((loader, resources) => {
      state = load(resources, app);

      app.ticker.add(delta => update(state, world, input, delta));

      resolve(app.view);
    });

    app.view.addEventListener("mousemove", ev => {
      input.mouse.x = ev.clientX;
      input.mouse.y = ev.clientY;
    });
  });

  return promise;
};

export default run;
