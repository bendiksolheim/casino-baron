import Phaser from "phaser";

const textStyle = {
  fontFamily: "Alphabeta",
  fontSize: "24px",
  fill: "#000"
};

class Text<T> {
  private text: Phaser.GameObjects.Text;
  private value: T;
  private transformer: (v: T) => string;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    value: T,
    transformer: (v: T) => string
  ) {
    this.value = value;
    this.transformer = transformer;
    this.text = scene.add
      .text(x, y, transformer(value), textStyle)
      .setOrigin(1.0, 1.0);
  }

  transformText(
    textTransformer: (text: Phaser.GameObjects.Text) => void
  ): Text<T> {
    textTransformer(this.text);
    return this;
  }

  setValue(value: T): boolean {
    if (value !== this.value) {
      this.value = value;
      this.text.setText(this.transformer(value));
      return true;
    } else {
      return false;
    }
  }
}

export default Text;
