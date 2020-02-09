/// <reference path='./index.d.ts'/>
import * as Phaser from "phaser";
import MainScene from "./scenes/main-scene";

const config: Phaser.Types.Core.GameConfig = {
  title: "Casino Baron",

  type: Phaser.AUTO,

  scale: {
    width: 1200,
    height: 800
  },

  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },

  scene: MainScene,

  parent: "game",
  backgroundColor: "#333333"
};

export const game = new Phaser.Game(config);
