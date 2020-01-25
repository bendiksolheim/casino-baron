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

export type RenderFunction = (
  state: any,
  world: World,
  app: PIXI.Application
) => void;

export type UpdateFunction = (
  state: any,
  world: World,
  input: InputEvent,
  delta: number
) => void;

type StartFunction = () => void;
type RunReturnValue = { canvas: HTMLCanvasElement; start: StartFunction };
type RunFunction = (
  state: any,
  update: UpdateFunction,
  render: RenderFunction
) => Promise<RunReturnValue>;

const step: number = 1 / 60;
const input: InputEvent = {
  mouse: { x: null, y: null }
};

const gameLoop = (
  app: PIXI.Application,
  world: World,
  state: any,
  update: UpdateFunction,
  render: RenderFunction
) => {
  let last = timestamp();
  let delta = 0;
  let gameState = state;

  return function innerLoop(now: number) {
    const diff = Math.min(1, (now - last) / 1000);
    delta = delta + diff;
    while (delta > step) {
      delta = delta - step;
      update(gameState, world, input, step);
    }
    const fps = Math.round(1 / diff);

    render(gameState, world, app);
    renderFps(app, fps);
    last = now;

    requestAnimationFrame(innerLoop);
  };
};

let text: PIXI.Text;

function renderFps(app: PIXI.Application, fps: number): void {
  app.stage.removeChild(text);
  text = new PIXI.Text(`fps: ${fps}`, {
    fontFamily: "Arial",
    fontSize: 25,
    fill: 0xffffff,
    align: "center"
  });
  app.stage.addChild(text);
}

function timestamp(): number {
  return window.performance.now();
}

const run: RunFunction = async (state, update, render) => {
  const promise = new Promise<RunReturnValue>((resolve, reject) => {
    const app = new PIXI.Application({ width: 600, height: 400 });
    const world = {
      x: 0,
      y: 0,
      width: app.view.width,
      height: app.view.height
    };
    const loop = gameLoop(app, world, state, update, render);

    app.loader.add(state.balls[0].state.sprite).load(() => {
      state.balls.map((ball: any) => {
        ball.setSprite(
          new PIXI.Sprite(app.loader.resources[ball.state.sprite].texture)
        );

        app.stage.addChild(ball.sprite);
      });

      resolve({ canvas: app.view, start: () => requestAnimationFrame(loop) });
    });

    app.view.addEventListener("mousemove", ev => {
      input.mouse.x = ev.clientX;
      input.mouse.y = ev.clientY;
    });
  });

  return promise;
};

export default run;
