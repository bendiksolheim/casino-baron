/// <reference path='./index.d.ts'/>
import * as PIXI from "pixi.js";
import VelocitySprite from "./engine/velocity-sprite";
import run, {
  World,
  InputEvent,
  LoadFunction,
  UpdateFunction,
  Resources
} from "./engine/index";
import updateCircle from "./engine/circle";
import ball from "./static/ball.png";

const update: UpdateFunction = (state, world, input, delta) => {
  state.balls.forEach((ball: any) => updateCircle(ball, world, input, delta));
};

const resources: Resources = [{ name: "ball", url: ball }];

const load: LoadFunction = (resources, app) => {
  const state = {
    balls: [
      new VelocitySprite(resources["ball"].texture, 300, 200, 10, -10),
      new VelocitySprite(resources["ball"].texture, 300, 200, 5, 10)
    ]
  };

  state.balls.forEach((ball: PIXI.Sprite) => app.stage.addChild(ball));

  return state;
};

function gameLoop(delta: number) {}

async function a() {
  const canvas = await run(resources, load, update);

  document.body.appendChild(canvas);
}

a();
