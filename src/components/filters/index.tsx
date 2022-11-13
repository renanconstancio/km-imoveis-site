import { parse, stringify } from "query-string";
import { SetStateAction, useEffect, useState } from "react";
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
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useGeolocation } from "../../hooks/use-geolocation";

type PropsFiltersComp = {
  variant?: "row" | "col";
};

type PropsFilters = {
  category: string;
  district: string;
  city: string;
  reference: string;
  situation: string | "location" | "purchase" | "sale" | "exchange";
};

export function Filters({ variant = "col" }: PropsFiltersComp) {
  const [openClose, setOpenClose] = useState<boolean>(false);
  const [categories, setCategories] = useState<PropsCategories[]>([]);
  const [cities, setCities] = useState<
    { city: string; state: string; neighborhoods: { district: string }[] }[]
  >([]);
  const [citiesDefault, setCitiesDefault] = useState<string>("");
  const [neighborhoods, setNeighborhoods] = useState<{ district: string }[]>(
    [],
  );

  const { geolocation } = useGeolocation();
  const { handleSubmit, register } = useForm<PropsFilters>();

  const navigate = useNavigate();
  const location = useLocation();
  const parsed = parse(location.search);

  function onSubmit(data: PropsFilters) {
    if (data.situation === "Venda") data = { ...data, situation: "sale" };
    if (data.situation === "Locação") data = { ...data, situation: "location" };
    if (data.situation === "Compra") data = { ...data, situation: "purchase" };
    if (data.situation === "Permuta") data = { ...data, situation: "exchange" };
    // if (geolocation?.city) data = { ...data, city: geolocation?.city };
    if (geolocation?.city !== data.city)
      data = { ...data, city: data.city.split("/")[0] };

    navigate({
      pathname: "/search",
      search: stringify({ ...parsed, ...data }),
    });
  }

  function handleChangeCity(search: string) {
    setNeighborhoods(
      cities.filter(
        ({ city, state }) => [city, state].join("/") === search,
      )?.[0]?.neighborhoods || [],
    );
  }

  async function loadFilters() {
    await api
      .get("/immobiles/website/filter")
      .then(async res => setCities(await res.data));
  }

  async function loadCategories() {
    await api
      .get("/categories")
      .then(async res => setCategories(await res.data));
  }

  useEffect(() => {
    setCitiesDefault(`${geolocation?.city}`);
  }, []);

  useEffect(() => {
    if (!categories.length) loadCategories();
  }, [categories]);

  useEffect(() => {
    loadFilters();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span
        className="btn-primary cursor-pointer inline-block md:hidden"
        onClick={() => setOpenClose(!openClose)}
      >
        <FontAwesomeIcon icon={faBars} />
      </span>
      <ul
        className={`${
          !openClose ? "hidden mt-3 md:m-0 md:flex" : "flex mt-3 md:m-0"
        } ${
          variant === "col" ? "flex-col" : "flex-col md:flex-row"
        } gap-3 md:mr-5 aling-end`}
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
            list="situation"
            type="search"
            label="Locação/Compra"
            className={`input-form`}
            placeholder={"Locação/Compra"}
            register={register("situation")}
          />
          <datalist id="situation">
            <option value="Locação" data-id="location" />
            <option value="Compra" data-id="purchase" />
            <option value="Permuta" data-id="exchange" />
            <option value="Venda" data-id="sale" />
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
            onChange={e => handleChangeCity(e.target.value)}
            defaultValue=""
          />
          <datalist id="cities">
            {cities.map(({ city, state }, id) => (
              <option value={[city, state].join("/")} key={id} />
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
            {neighborhoods.map(({ district }, id) => (
              <option value={district} key={id} />
            ))}
          </datalist>
        </li>
        <li>
          <Input
            type="text"
            label="Código do Imovél"
            className={`input-form`}
            placeholder={""}
            register={register("reference")}
          />
        </li>
        <li>
          <label htmlFor="" className="label-form">
            &nbsp;
          </label>
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
