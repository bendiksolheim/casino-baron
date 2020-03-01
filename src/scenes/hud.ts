import Phaser from "phaser";
import GameState, { ListenerT, GameStateT } from "engine/game-state";
import tilemapResource from "static/outdoor.json";
import { GameObjectWithLocation, findObject } from "util/phaser";
import { decimalGroup } from "util/number";
import Date from "util/date";
import Time from "engine/time";

const textStyle = {
  fontFamily: "Alphabeta",
  fontSize: "24px",
  fill: "#000"
};

const config: Phaser.Types.Scenes.SettingsConfig = {
  active: true,
  visible: true,
  key: "hud"
};

export default class Hud extends Phaser.Scene implements ListenerT {
  private cashPoint!: GameObjectWithLocation;
  private balanceText!: Phaser.GameObjects.Text;
  private dateText!: Phaser.GameObjects.Text;

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
    const { width, height } = this.game.canvas;
    this.rexUI;

    this.rexUI.add
      .roundRectangle(0, height, width, 40, 0, 0xcccccc)
      .setOrigin(0.0, 1.0);

    this.balanceText = this.add
      .text(
        width - 10,
        height - 10,
        `${decimalGroup(GameState.get().balance)}$`,
        textStyle
      )
      .setOrigin(1.0, 1.0);

    this.dateText = this.add
      .text(10, height - 10, `${Date.formatDate(Time.getDate())}`, textStyle)
      .setOrigin(0.0, 1.0);
  }

  update(time: number, delta: number) {
    Time.tick(delta);
    this.dateText.setText(Date.formatDate(Time.getDate()));
  }

  stateChanged(newState: GameStateT) {
    this.balanceText.setText(`${decimalGroup(newState.balance)}$`);
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
