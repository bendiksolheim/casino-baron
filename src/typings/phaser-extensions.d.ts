import * as Phaser from "phaser";

declare class RoundRectangle extends Phaser.GameObjects.Shape {}
declare class Buttons extends Phaser.GameObjects.Shape {}
declare class Label extends Phaser.GameObjects.Shape {}

type ButtonConfig = {
  x: number;
  y: number;
  width?: number;
  height?: number;
  buttons: Label[];
  expand?: boolean;
};

type LabelConfig = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  text: Phaser.GameObjects.Text;
  background: RoundRectangle;
  align?: "left" | "top" | "center" | "right" | "bottom";
};

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

        label: (config: LabelConfig) => Label;

        buttons: (config: ButtonConfig) => Buttons;
      };
    };
  }
}
