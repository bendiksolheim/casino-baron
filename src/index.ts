/// <reference path='./index.d.ts'/>
import start from "./engine/index";
import resources from "./static/index";
import MainScene from "./scenes/main-scene";

const scenes = [
  {
    name: "main",
    gameScene: new MainScene()
  }
];

start(scenes, resources, engine => engine.mount(document.body));
