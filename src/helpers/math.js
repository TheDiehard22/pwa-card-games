export function getRandomIntInclusive(max = 1) {
  // max should be array length -1
  const min = 0;
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
