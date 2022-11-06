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
import { useGeolocation } from "../../hooks/use-geolocation";

type PropsFiltersComp = {
  variant?: "row" | "col";
};

type PropsFilters = {
  category: string;
  district: string;
  city: string;
  reference: string;
};

export function Filters({ variant = "col" }: PropsFiltersComp) {
  const [cities, setCities] = useState<PropsCities[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<PropsNeighborhoods[]>([]);
  const [categories, setCategories] = useState<PropsCategories[]>([]);

  const { handleSubmit, register } = useForm<PropsFilters>();
  const { geolocation } = useGeolocation();

  const navigate = useNavigate();
  const location = useLocation();
  const parsed = parse(location.search);

  function onSubmit(data: PropsFilters) {
    navigate({
      pathname: "/search",
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
      api.get("/cities").then(async res =>
        setCities(
          await res.data.filter((f: any) => {
            return [f.city, f.state.state].join("/") === geolocation.nome;
          }),
        ),
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      api
        .get("/neighborhoods")
        .then(async res => setNeighborhoods(await res.data));
    })();
  }, []);

  console.log(geolocation);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul
        className={`flex ${
          variant === "col" ? "flex-col" : "flex-row items-end"
        } gap-5 md:mr-5`}
      >
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
          <button
            className="btn-primary flex gap-2 h-[38px] px-3"
            type="submit"
          >
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
