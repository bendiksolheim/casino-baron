/// <reference path='./index.d.ts'/>
import start from "./engine/index";
import resources from "./static/index";
import MenuScene from "./scenes/menu-scene";
import MainScene from "./scenes/main-scene";

const scenes = [
  {
    name: "menu",
    gameScene: new MenuScene()
  },
  {
    name: "main",
    gameScene: new MainScene()
  }
];

start(scenes, resources, engine => engine.mount(document.body));
