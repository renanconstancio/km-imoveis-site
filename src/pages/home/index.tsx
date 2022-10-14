import { useEffect, useState } from "react";
import { api, apiListOfHouses } from "../../api/api";
import { Card } from "../../components/card";
import { CarouselIndex } from "../../components/carousel";
import { price } from "../../utils/price";

type PropsListOfHouseImage = {
  image: string;
};

type PropsListOfHouse = {
  title: string;
  address: string;
  district: string;
  number: string;
  city: string;
  state: string;
  zip_code: string;
  price: number;
  description?: string;
  tags: string[];
  images: PropsListOfHouseImage[];
};

type PropsStates = {
  id: string;
  state: string;
};

export function Home() {
  const [states, setStates] = useState<PropsStates[]>([]);
  const [listOfHouses, setListOfHouses] = useState<PropsListOfHouse[]>([]);

  useEffect(() => {
    (async () => {
      api.get("/states").then(async res => {
        setStates(await res.data);
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setListOfHouses(apiListOfHouses);
    })();
  }, []);

  return (
    <>
      <CarouselIndex />
      <div className="border-b border-gray-200 py-2">
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

        <div className="container text-2xl uppercase font-play font-bold mb-7">
          {listOfHouses.length} encotrado(s)
        </div>

        <ul className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {listOfHouses.map((item, k) => (
            <Card
              key={k}
              title={item.title}
              price={price(item.price)}
              address={[item.district, `${item.city}/${item.state}`].join(", ")}
              tags={item.tags}
              images={item.images.reduce((acc: string[], { image }) => {
                acc.push(image);
                return acc;
              }, [])}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
