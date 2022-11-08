export function findSearch(arr: any[], value: string, key: string) {
  return arr.find(item => item[key] === value);
}

export function situationText(text: any) {
  return Object.assign({
    location: "Locação",
    exchange: "Permuta",
    purchase: "Compra",
    sale: "Venda",
  })[text];
}

export function situationTextClassName(text: any) {
  return Object.assign({
    location: "bg-km-blue",
    exchange: "bg-km-orange",
    purchase: "bg-emerald-500",
    sale: "bg-km-red",
  })[text];
}

export function addClassName(text: any) {
  return Object.assign({
    access: "w-6 h-6 rounded-full bg-blue-200",
    create: "w-6 h-6 rounded-full bg-green-200",
    update: "w-6 h-6 rounded-full bg-orange-200",
    delete: "w-6 h-6 rounded-full bg-red-200",
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
