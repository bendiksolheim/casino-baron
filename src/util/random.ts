function random() {
  return Math.random();
}

function randomFrom<T>(objects: T[]): T {
  const index = Math.floor(random() * objects.length);
  return objects[index];
}

function randomAround(n: number): number {
  const lowerBound = n / 2;
  const upperBound = n + lowerBound;
  return (upperBound - lowerBound) * random() + lowerBound;
}

export { random, randomFrom, randomAround };
