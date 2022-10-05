export function price(number: number | bigint) {
  return new Intl.NumberFormat().format(number);
}
