export function OptionSituationList() {
  return (
    <>
      <option value="Locação" />
      <option value="Venda" />
      <option value="Venda e Locação" />
      <option value="Venda e Permuta" />
      <option value="Compra" />
      <option value="Permuta" />
    </>
  );
}

export function OptionSituation() {
  return (
    <>
      <option value="location">Locação</option>
      <option value="sale">Venda</option>
      <option value="exchange">Permuta</option>
      <option value="purchase">Compra</option>
      <option value="sale_barter">Venda e Permuta</option>
      <option value="sale_lease">Venda e Locação</option>
    </>
  );
}
