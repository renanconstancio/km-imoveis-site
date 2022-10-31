export function maskCep(value: string) {
  value = value.replace(/\D/g, ""); // 1239856
  value = value.replace(/^(\d{5})(\d)/, "$1-$2");
  return value;
}

export function maskCPF(string: string): string {
  return String(string)
    .replace(/\D/g, "")
    .replace(/^(\d{3})(\d)/g, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})\/(\d{2})(\d)/, "$1.$2.$3-$4")
    .substring(0, 14);
}

export function maskPhone(value: string) {
  value = value.replace(/\D/g, "");
  // (11)1111-1111
  value = value.replace(/^(\d{2})(\d)/g, "($1)$2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
}

export function maskCurrencyUs(string: string) {
  return String(string)
    .replace(/\D/g, "")
    .replace(/(\d)(\d{2})$/, "$1.$2")
    .replace(/(?=(\d{3})+(\D))\B/g, "");
}

export function maskCurrency(string: string) {
  return String(string)
    .replace(/\D/g, "")
    .replace(/(\d)(\d{2})$/, "$1,$2")
    .replace(/(?=(\d{3})+(\D))\B/g, ".");
}
