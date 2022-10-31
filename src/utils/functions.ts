export function find(arr: any[], value: string, key: string) {
  return arr.find(item => item[key] === value);
}

export function situationText(text: any) {
  return Object.assign({
    location: "Locação",
    purchase: "Compra",
    sale: "Venda",
  })[text];
}

export function slugiFy(string: string): string {
  return string
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036F]/g, "")
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
