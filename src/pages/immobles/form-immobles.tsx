import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import { Loading } from "../../components/loading";

type PropsImmobles = {
  id: string;
  streets_id: string;
  number: string;
  description: string;
  sale_price: number;
  rent_price: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

type PropsStreets = {
  id: string;
  street: string;
  zip_code: string;
};

export default function FormImmobles() {
  const [immobles, setImmobles] = useState<PropsImmobles[]>([]);
  const [streets, setStreets] = useState<PropsStreets[]>([]);

  useEffect(() => {
    (async () => {
      api.get("/streets").then(async res => setStreets(await res.data));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      api.get("/immobles").then(async res => setImmobles(await res.data));
    })();
  }, []);

  if (immobles.length) return <Loading />;

  return (
    <div>
      <ul className="border-b mb-5">
        <li>
          <Link className="btn-warning" to="/adm/immobles">
            Voltar
          </Link>
        </li>
      </ul>
      <form className="w-full">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-10/12 px-3">
            <label className="label-form" htmlFor="grid-1">
              Nome do Imovél
            </label>
            <input
              className="input-form"
              id="grid-first-name"
              type="text"
              placeholder="Rua João Dias das Flores"
            />
          </div>
          <div className="w-full md:w-2/12 px-3">
            <label className="label-form" htmlFor="grid-2">
              Número
            </label>
            <input
              type="text"
              id="grid-2"
              className="input-form"
              placeholder="1234"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-2/12 px-3 mb-6">
            <label className="label-form" htmlFor="grid-state">
              Situação
            </label>
            <div className="relative">
              <select className="select-form" id="grid-state">
                <option value="leased">Alugado</option>
                <option value="sold">Vendido</option>
                <option value="available">Disponível</option>
              </select>
            </div>
          </div>
          <div className="w-full md:w-2/12 px-3 mb-6">
            <label className="label-form" htmlFor="web">
              Web
            </label>
            <div className="relative">
              <select className="select-form" id="web">
                <option value={1}>Publicar</option>
                <option value={0}>Congelar</option>
              </select>
            </div>
          </div>

          <div className="w-full md:w-3/12 px-3">
            <label className="label-form" htmlFor="grid-2">
              Preço Venda
            </label>
            <input
              type="text"
              id="grid-2"
              className="input-form"
              placeholder="1234"
            />
          </div>
          <div className="w-full md:w-3/12 px-3">
            <label className="label-form" htmlFor="grid-2">
              Preço Venda/Aluguel
            </label>
            <input
              type="text"
              id="grid-2"
              className="input-form"
              placeholder="1234"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-7/12 px-3 mb-6">
            <label className="label-form" htmlFor="grid-state">
              Nome da Rua
            </label>
            <div className="relative">
              <input
                list="streets"
                type="search"
                className="input-form"
                placeholder="Pesquisa nome da rua"
              />
              <datalist id="streets">
                {streets.map(({ id, street, zip_code }) => (
                  <option key={id} value={[street, zip_code].join(", ")} />
                ))}
              </datalist>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
