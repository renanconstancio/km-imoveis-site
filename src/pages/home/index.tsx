import { useEffect, useState } from "react";
import { apiListOfHouses } from "../../api/api";
import { Card } from "../../components/card";
import { price } from "../../utils/price";

type PropsCardIndex = {
  title: string;
  address: string;
  district: string;
  number: string;
  city: string;
  state: string;
  zip_code: string;
  price: string;
  description: string;
  tags: [];
  images: {
    image: string;
  }[];
};

export function Home() {
  const [listOfHouses, setListOfHouses] = useState<PropsCardIndex[]>([]);

  useEffect(() => {
    (async () => {
      setListOfHouses(apiListOfHouses);
    })();
  }, []);

  return (
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

      <ul className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {listOfHouses.map((item, k) => (
          <Card
            key={k}
            title={item.title}
            price={price(item.price)}
            address={[
              item.address,
              item.number,
              item.district,
              `${item.city}/${item.state}`,
              item.zip_code,
            ].join(", ")}
            tags={item.tags}
            images={item.images.reduce((acc, { image }) => {
              acc.push(image);
              return acc;
            }, [])}
          />
        ))}
      </ul>
    </div>
  );
}
