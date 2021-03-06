/// <reference path='./typings/statics.d.ts'/>
/// <reference path='./typings/phaser3-rex-plugins.d.ts'/>
/// <reference path='./typings/phaser-extensions.d.ts'/>
import Phaser from "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import MainScene from "./scenes/main";
import Hud from "./scenes/hud";
import GameState from "engine/game-state";
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

  scene: [MainScene, Hud],

  parent: "game",
  backgroundColor: "#333333",

  pixelArt: true,

  plugins: {
    scene: [
      {
        key: "rexUI",
        plugin: RexUIPlugin,
        mapping: "rexUI"
      }
    ]
  }
};

window.onbeforeunload = function(): void {
  GameState.persist();
};

export const game = new Phaser.Game(config);
