import Phaser from "phaser";

type XYCoordT = {
  x: number;
  y: number;
};

type PolylineGameObjectT = Phaser.GameObjects.GameObject & {
  polyline: XYCoordT[];
  x: number;
  y: number;
};

function getPath(
  scene: Phaser.Scene,
  gameObject: Phaser.GameObjects.GameObject
): Phaser.Curves.Path {
  if (isPolyline(gameObject)) {
    const { x, y, polyline } = gameObject as PolylineGameObjectT;
    const path = scene.add.path(x, y);
    polyline.forEach((coord: XYCoordT) => {
      path.lineTo(x + coord.x, y + coord.y);
    });
    return path;
  } else {
    throw Error(`Object is not a polyline:\n${JSON.stringify(gameObject)}`);
  }
}

function isPolyline(gameObject: Phaser.GameObjects.GameObject): boolean {
  return (
    gameObject.hasOwnProperty("polyline") &&
    gameObject.hasOwnProperty("x") &&
    gameObject.hasOwnProperty("y")
  );
}

export { getPath };
