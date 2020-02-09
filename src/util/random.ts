function random() {
  return Math.random();
}

function randomFrom<T>(objects: T[]): T {
  const index = Math.floor(random() * objects.length);
  return objects[index];
}

export { random, randomFrom };
