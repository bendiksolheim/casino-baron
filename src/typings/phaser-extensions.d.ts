import * as Phaser from "phaser";

declare class RoundRectangle extends Phaser.GameObjects.Shape {}

declare module "phaser" {
  interface Scene {
    rexUI: {
      add: {
        roundRectangle: (
          x: number,
          y: number,
          width: number,
          height: number,
          radius: number,
          fillColor: number
        ) => RoundRectangle;
      };
    };
  }
}
