import { parse, stringify } from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PropsCategories, PropsNeighborhoods } from "../../global/types/types";
import { Input } from "../inputs";
import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";

type PropsFiltersComp = {
  variant?: "row" | "col";
};

type PropsFilters = {
  category: string;
  district: string;
  city: string;
  reference: string;
  situation: string | "location" | "purchase" | "sale";
};

export function Filters({ variant = "col" }: PropsFiltersComp) {
  const [openClose, setOpenClose] = useState<boolean>(false);
  const [categories, setCategories] = useState<PropsCategories[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<PropsNeighborhoods[]>([]);
  // const [cities, setCities] = useState<PropsCities[]>([]);

  const { handleSubmit, register } = useForm<PropsFilters>();

  const navigate = useNavigate();
  const location = useLocation();
  const parsed = parse(location.search);

  function onSubmit(data: PropsFilters) {
    if (data.situation === "Locação") data = { ...data, situation: "location" };
    if (data.situation === "Compra") data = { ...data, situation: "purchase" };
    if (data.situation === "Venda") data = { ...data, situation: "sale" };

    navigate({
      pathname: "/search",
      search: stringify({ ...parsed, ...data }),
    });
  }

  async function loadCategories() {
    await api
      .get("/categories")
      .then(async res => setCategories(await res.data));
  }

  // async function loadCities() {
  //   await api.get("/cities").then(async res =>
  //     setCities(
  //       await res.data.filter((f: any) => {
  //         return [f.city, f.state.state].join("/") === geolocation?.nome;
  //       }),
  //     ),
  //   );
  // }

  async function loadNeighborhoods() {
    await api
      .get("/neighborhoods")
      .then(async res => setNeighborhoods(await res.data));
  }

  useEffect(() => {
    (async () => {
      if (!categories.length) loadCategories();
    })();
  }, [categories]);

  // useEffect(() => {
  //   (async () => {
  //     if (!cities) loadCities();
  //   })();
  // }, [cities]);

  useEffect(() => {
    (async () => {
      if (!neighborhoods.length) loadNeighborhoods();
    })();
  }, [neighborhoods]);

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
        } gap-5 md:mr-5 aling-end`}
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
            <option value="Venda" data-id="sale" />
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
        {/* <li>
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
        </li> */}
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
