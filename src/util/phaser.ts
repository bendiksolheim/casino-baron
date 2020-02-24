import Phaser from "phaser";

export type GameObjectWithLocation = Phaser.GameObjects.GameObject & {
  x: number;
  y: number;
};

export function findObject(
  map: Phaser.Tilemaps.Tilemap,
  name: string
): GameObjectWithLocation {
  return map.findObject(
    "objects",
    obj => obj.name === name
  ) as GameObjectWithLocation;
}

type XYCoordT = {
  x: number;
  y: number;
};

type PolylineGameObjectT = Phaser.GameObjects.GameObject & {
  polyline: XYCoordT[];
  x: number;
  y: number;
};

export function getPath(
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
