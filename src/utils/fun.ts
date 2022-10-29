export function find(arr: any[], value: string, key: string) {
  return arr.find(item => item[key] === value);
}

export function price(number: number | bigint) {
  return new Intl.NumberFormat().format(number);
}

export function priceBR(price: string | number) {
  const value = Number(String(price).replace(/\D/g, ""));
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  // const value = String(price).replace(/\D/g, "");
  // return Number(price).toLocaleString("pt-BR", {
  //   style: "currency",
  //   currency: "BRL",
  // });
}

export function priceUS(price: string | number) {
  const value = String(price).replace(/\D/g, "");
  return (parseFloat(value) / 100)
    .toLocaleString("en-US", {
      minimumFractionDigits: 2,
    })
    .replace(",", "");
}

export function CPFMask(v: string): string {
  console.log(v);
  v = v.replace(/\D/g, "");
  v = v.replace(/^(\d{3})(\d)/g, "$1.$2");
  v = v.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})\/(\d{2})(\d)/, "$1.$2.$3-$4");
  return v.substring(0, 14);
}
