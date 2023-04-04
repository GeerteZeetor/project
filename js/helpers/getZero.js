export function getZero(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  }
  return num;
}
