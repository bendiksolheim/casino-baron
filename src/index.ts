/// <reference path='./index.d.ts'/>
import run, {
  World,
  InputEvent,
  UpdateFunction,
  RenderFunction
} from "./engine";
import Circle from "./circle";
import ball from "./static/ball.png";

const update: UpdateFunction = (state, world, input, delta) => {
  state.balls.forEach((ball: any) => ball.update(world, input, delta));
};

const render: RenderFunction = (state, world, app) => {
  state.balls.forEach((ball: any) => ball.render(app));
};

const state = {
  balls: [
    new Circle(300, 200, 100, -100, ball),
    new Circle(300, 200, 50, 100, ball)
  ]
};

async function a() {
  const { canvas, start } = await run(state, update, render);

  document.body.appendChild(canvas);

  start();
}

a();
