export function find(arr: any[], value: string, key: string) {
  return arr.find(item => item[key] === value);
}

export function price(number: number | bigint) {
  return new Intl.NumberFormat().format(number);
}
