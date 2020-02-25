import Phaser from "phaser";
import GameState, { ListenerT, GameStateT } from "../game-state";
import tilemapResource from "../static/outdoor.json";
import { GameObjectWithLocation, findObject } from "../util/phaser";

const config: Phaser.Types.Scenes.SettingsConfig = {
  active: true,
  visible: true,
  key: "hud"
};

export default class Hud extends Phaser.Scene implements ListenerT {
  private cashPoint!: GameObjectWithLocation;
  private balanceText!: Phaser.GameObjects.Text;

  constructor() {
    super(config);
    GameState.listen(this);
  }

  public preload() {
    this.load.tilemapTiledJSON("map", tilemapResource);
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    this.cashPoint = findObject(map, "cash_point");
    this.balanceText = this.add.text(10, 10, `${GameState.get().balance}$`, {
      fontFamily: "Alphabeta",
      fontSize: "32px",
      fill: "#000"
    });
  }

  update() {}

  stateChanged(newState: GameStateT) {
    this.balanceText.setText(`${GameState.get().balance}`);
    const text = this.add
      .text(this.cashPoint.x, this.cashPoint.y, `$`, {
        fontFamily: "Alphabeta",
        fontSize: "32px",
        fill: "#000"
      })
      .setOrigin(0.5, 0.5);

    this.add.tween({
      targets: [text],
      alpha: 0,
      duration: 1000,
      onComplete: () => text.destroy()
    });
  }
}
