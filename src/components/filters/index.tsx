type PropsFilters = {
  states: any;
};

export function Filters({ states }: PropsFilters) {
  return (
    <ul className="container border-cyan-400 border-t-8 bg-slate-100 mb-7 p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
      <li>
        <label className="block">
          <span className="text-gray-700">Tipo</span>
          <input
            list="browsers"
            type="search"
            className="block w-full"
            placeholder="Tipos de Imoveis"
          />
        </label>
        <datalist id="browsers">
          {states.map(state => (
            <option value={state.state} key={state.id} />
          ))}
        </datalist>
      </li>
      <li>
        <label className="block">
          <span className="text-gray-700">Cidade</span>
          <input
            list="browsers"
            type="search"
            className="block w-full"
            placeholder="Tipos de Imoveis"
          />
        </label>
        <datalist id="browsers">
          <option value="Chrome" />
          <option value="Firefox" />
          <option value="Internet Explorer" />
          <option value="Opera" />
          <option value="Safari" />
          <option value="Microsoft Edge" />
        </datalist>
      </li>
      <li>
        <label className="block">
          <span className="text-gray-700">Bairro</span>
          <input
            list="browsers"
            type="search"
            className="block w-full"
            placeholder="Tipos de Imoveis"
          />
        </label>
        <datalist id="browsers">
          <option value="Chrome" />
          <option value="Firefox" />
          <option value="Internet Explorer" />
          <option value="Opera" />
          <option value="Safari" />
          <option value="Microsoft Edge" />
        </datalist>
      </li>
      <li>
        <label className="block">
          <span className="text-gray-700">Rua</span>
          <input
            list="browsers"
            type="search"
            className="block w-full"
            placeholder="Tipos de Imoveis"
          />
        </label>
        <datalist id="browsers">
          <option value="Chrome" />
          <option value="Firefox" />
          <option value="Internet Explorer" />
          <option value="Opera" />
          <option value="Safari" />
          <option value="Microsoft Edge" />
        </datalist>
      </li>
    </ul>
  );
}
