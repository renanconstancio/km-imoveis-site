import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { parse, stringify } from "query-string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useGeolocation } from "../../hooks/use-geolocation";
import { TFilters, TFiltersComp } from "./types";
import { TCategories } from "../../pages/admin-categories/types";
import { maskCurrency, maskCurrencyUs } from "../../utils/mask";
import { useForm } from "react-hook-form";
import { Input } from "../inputs";
import { useFetch } from "../../hooks/use-fetch";
import { slugiFy } from "../../utils/functions";

export function Filters({ variant = "col" }: TFiltersComp) {
  const [openClose, setOpenClose] = useState<boolean>(false);
  const [checked, setCheched] = useState<{ [x: string]: boolean }>({
    locacao: true,
  });
  const [neighborhoods, setNeighborhoods] = useState<{ district: string }[]>(
    [],
  );
  const { geolocation } = useGeolocation();

  const { data: categories } = useFetch<TCategories[]>("/categories");

  const { data: cities } = useFetch<
    { city: string; state: string; neighborhoods: { district: string }[] }[]
  >("/immobiles/website/filter");

  const { register, handleSubmit } = useForm<TFilters>();

  const navigate = useNavigate();
  const location = useLocation();
  const parsed = parse(location.search);

  function handleOnSubmit(data: TFilters) {
    switch (data.situation as string) {
      case "Venda":
        data = { ...data, situation: "sale" };
        break;
      case "Locação":
      case "Alugar":
        data = { ...data, situation: "location" };
        break;
      case "Compra":
        data = { ...data, situation: "purchase" };
        break;
      case "Permuta":
        data = { ...data, situation: "exchange" };
        break;
      case "Venda e Locação":
      case "Venda ou Locação":
      case "Venda ou Alugar":
        data = { ...data, situation: "sale_lease" };
        break;
      case "Venda e Permuta":
        data = { ...data, situation: "sale_barter" };
        break;
    }

    if (geolocation?.city !== data.city)
      data = { ...data, city: data.city.split("/")[0] };

    if (data.price_lte) {
      data = {
        ...data,
        price_lte: maskCurrencyUs(data.price_lte),
      };
    }

    if (data.price_gte) {
      data = {
        ...data,
        price_gte: maskCurrencyUs(data.price_gte),
      };
    }

    navigate({
      pathname: "/search",
      search: stringify({ ...parsed, ...data }),
    });
  }

  function handleChangeCity(search: string) {
    setNeighborhoods(
      cities?.filter(
        ({ city, state }) => [city, state].join("/") === search,
      )?.[0]?.neighborhoods || [],
    );
  }

  return (
    <div className="container px-4 mt-5">
      <form onSubmit={handleSubmit(handleOnSubmit)} id="search">
        <span
          className="btn-primary cursor-pointer inline-block md:hidden"
          onClick={() => setOpenClose(!openClose)}
        >
          <FontAwesomeIcon icon={faBars} />
        </span>

        <div
          className={`${
            !openClose ? "hidden md:flex" : ""
          } items-center bg-transparent`}
        >
          {[
            "Locação",
            "Venda",
            "Venda ou Locação",
            // "Venda e Permuta",
            // "Compra",
            // "Permuta",
          ].map((label, i) => (
            <React.Fragment key={i}>
              <input
                type="radio"
                value={label}
                id={`${slugiFy(label)}`}
                className={`h-0 w-0`}
                {...register("situation")}
                onChange={() =>
                  setCheched({
                    [slugiFy(label)]: !checked[slugiFy(label)],
                  })
                }
                checked={checked[slugiFy(label)]}
              />
              <label
                htmlFor={`${slugiFy(label)}`}
                className={`p-4 uppercase font-play text-[10px] md:text-sm cursor-pointer box-border rounded-t-md ml-2 ${
                  checked[slugiFy(label)] ? "bg-slate-100" : "bg-gray-200"
                }`}
              >
                {label}
              </label>
            </React.Fragment>
          ))}
        </div>

        <ul
          className={`${!openClose ? "hidden md:m-0 md:flex" : "flex md:m-0"} ${
            variant === "col" ? "flex-col" : "flex-col md:flex-row"
          } aling-end flex-wrap pb-5 rounded-md bg-slate-100 gap-5 p-5`}
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
              {categories?.map(({ id, category }) => (
                <option value={category} key={id} />
              ))}
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
              {cities?.map(({ city, state }, id) => (
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
              className="input-form"
              register={register("reference")}
            />
          </li>

          <li className="flex gap-5">
            <span>
              <Input
                type="search"
                list="price_gte"
                label="Valor De"
                className="input-form text-end"
                register={register("price_gte")}
              />
              <datalist id="price_gte">
                {[...Array(32).keys()].map(
                  (i: number) =>
                    i > 0 && (
                      <option
                        value={maskCurrency(String(i * 2500000))}
                        key={i}
                      />
                    ),
                )}
              </datalist>
            </span>
            <span>
              <Input
                type="search"
                list="price_lte"
                label="Valor Até"
                className={`input-form text-end`}
                placeholder={""}
                register={register("price_lte")}
              />

              <datalist id="price_lte">
                {[...Array(32).keys()].map(
                  (i: number) =>
                    i > 0 && (
                      <option
                        value={maskCurrency(String(i * 2500000))}
                        key={i}
                      />
                    ),
                )}
              </datalist>
            </span>
          </li>

          <li>
            <label htmlFor="" className="label-form">
              &nbsp;
            </label>
            <button
              type="submit"
              className="btn-primary flex gap-2 h-[38px] px-3"
            >
              <span>
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <span>PESQUISAR</span>
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}
