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
    access: "w-8 h-8 cursor-pointer rounded-full text-blue-700 bg-blue-200",
    create: "w-8 h-8 cursor-pointer rounded-full text-green-700 bg-green-200",
    update: "w-8 h-8 cursor-pointer rounded-full text-orange-700 bg-orange-200",
    delete: "w-8 h-8 cursor-pointer rounded-full text-red-700 bg-red-200",
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

export function greetingMessage(str: string) {
  const h = new Date().getHours();
  return h <= 5
    ? `Boa madrugada ${str ?? ""}`
    : h < 12
    ? `Bom dia ${str ?? ""}`
    : h < 18
    ? `Boa tarde ${str ?? ""}`
    : `Boa noite ${str ?? ""}`;
}
