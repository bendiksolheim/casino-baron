export function findObject(
  map: Phaser.Tilemaps.Tilemap,
  name: string
): Phaser.GameObjects.GameObject {
  return map.findObject("objects", obj => obj.name === name);
}
