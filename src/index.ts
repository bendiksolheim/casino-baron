/// <reference path='./index.d.ts'/>
import Phaser from "phaser";
import MainScene from "./scenes/main";
import "./static/alphbeta.ttf";

type GameConfig = Phaser.Types.Core.GameConfig & {
  pixelArt: boolean;
};

const config: GameConfig = {
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
  backgroundColor: "#333333",

  pixelArt: true
};

export const game = new Phaser.Game(config);
