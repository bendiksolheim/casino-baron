export function findObject(
  map: Phaser.Tilemaps.Tilemap,
  name: string
): Phaser.GameObjects.GameObject {
  return map.findObject("routes", obj => obj.name === name);
}
