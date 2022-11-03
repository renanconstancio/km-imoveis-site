import { parse, stringify } from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PropsCategories,
  PropsCities,
  PropsNeighborhoods,
} from "../../global/types/types";
import { Input } from "../inputs";
import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type PropsFilters = {
  category: string;
  district: string;
  city: string;
  reference: string;
};

export function Filters() {
  const [cities, setCities] = useState<PropsCities[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<PropsNeighborhoods[]>([]);
  const [categories, setCategories] = useState<PropsCategories[]>([]);

  const { handleSubmit, register } = useForm<PropsFilters>();

  const navigate = useNavigate();
  const location = useLocation();
  const parsed = parse(location.search);

  function onSubmit(data: PropsFilters) {
    navigate({
      pathname: location.pathname,
      search: stringify({ ...parsed, ...data }),
    });
  }

  useEffect(() => {
    (async () => {
      api.get("/categories").then(async res => setCategories(await res.data));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      api.get("/cities").then(async res => setCities(await res.data));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      api.get("/districts").then(async res => setNeighborhoods(await res.data));
    })();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container border-cyan-400 border-t-8 bg-slate-100 mb-7 p-5"
    >
      <ul className="flex flex-row flex-wrap items-end gap-5">
        <li>
          <Input
            list="category"
            type="search"
            label="Tipo"
            className={`input-form`}
            placeholder={"Tipo de Imoveis"}
            register={register("category")}
          />
          <datalist id="category">
            {categories.map(({ id, category }) => (
              <option value={category} key={id} />
            ))}
          </datalist>
        </li>
        <li>
          <Input
            list="district"
            type="search"
            label="Bairro"
            className={`input-form`}
            placeholder={"Busca por Bairros"}
            register={register("district")}
          />
          <datalist id="district">
            {neighborhoods.map(({ id, district }) => (
              <option value={district} key={id} />
            ))}
          </datalist>
        </li>
        <li>
          <Input
            list="cities"
            type="search"
            label="Cidade"
            className={`input-form`}
            placeholder={"Busca por código"}
            register={register("city")}
          />
          <datalist id="cities">
            {cities.map(({ id, city, state }) => (
              <option value={[city, state.state].join("/")} key={id} />
            ))}
          </datalist>
        </li>
        <li>
          <Input
            type="text"
            label="Código do Imovél"
            className={`input-form`}
            placeholder={"C0011"}
            register={register("reference")}
          />
        </li>
        <li>
          <button className="btn-primary flex gap-2" type="submit">
            <span>
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <span>PESQUISAR</span>
          </button>
        </li>
      </ul>
    </form>
  );
}
