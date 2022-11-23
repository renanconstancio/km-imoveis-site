import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { parse, stringify } from "query-string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useGeolocation } from "../../hooks/use-geolocation";
import { OptionSituationList } from "../option-situation";
import { Input } from "../inputs";
import { TFilters, TFiltersComp } from "./types";
import { TCategories } from "../../pages/admin-categories/types";
import { maskCurrency } from "../../utils/mask";

export function Filters({ variant = "col" }: TFiltersComp) {
  const [openClose, setOpenClose] = useState<boolean>(false);
  const [categories, setCategories] = useState<TCategories[]>([]);
  const [cities, setCities] = useState<
    { city: string; state: string; neighborhoods: { district: string }[] }[]
  >([]);
  const [neighborhoods, setNeighborhoods] = useState<{ district: string }[]>(
    [],
  );
  // const [citiesDefault, setCitiesDefault] = useState<string>("");

  const { geolocation } = useGeolocation();
  const { handleSubmit, register } = useForm<TFilters>();

  const navigate = useNavigate();
  const location = useLocation();
  const parsed = parse(location.search);

  function onSubmit(data: TFilters) {
    switch (data.situation as string) {
      case "Venda":
        data = { ...data, situation: "sale" };
        break;
      case "Locação":
        data = { ...data, situation: "location" };
        break;
      case "Compra":
        data = { ...data, situation: "purchase" };
        break;
      case "Permuta":
        data = { ...data, situation: "exchange" };
        break;
      case "Venda e Locação":
        data = { ...data, situation: "sale_lease" };
        break;
      case "Venda e Permuta":
        data = { ...data, situation: "sale_barter" };
        break;
    }

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
      .then(async (res) => setCities(await res.data));
  }

  async function loadCategories() {
    await api
      .get("/categories")
      .then(async (res) => setCategories(await res.data));
  }

  // useEffect(() => {
  //   setCitiesDefault(`${geolocation?.city}`);
  // }, []);

  useEffect(() => {
    loadCategories();
  }, []);

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
        } gap-5 md:mr-5 aling-end flex-wrap`}
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
            <OptionSituationList />
          </datalist>
        </li>
        <li>
          <Input
            list="cities"
            type="search"
            label="Cidade"
            className={`input-form`}
            placeholder={"Busca por cidades"}
            register={register("city")}
            onChange={(e) => handleChangeCity(e.target.value)}
            defaultValue=""
          />
          <datalist id="cities">
            {cities.map(({ city, state }, id) => (
              <option
                value={city && state ? [city, state].join("/") : ""}
                key={id}
              />
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

        <li className="flex gap-5">
          <span>
            <Input
              type="tel"
              mask={maskCurrency}
              label="Valor De"
              className={`input-form text-end`}
              placeholder={""}
              register={register("price_gte")}
            />
          </span>
          <span>
            <Input
              type="tel"
              mask={maskCurrency}
              label="Valor Até"
              className={`input-form text-end`}
              placeholder={""}
              register={register("price_lte")}
            />
          </span>
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
