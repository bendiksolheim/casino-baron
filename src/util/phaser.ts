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
