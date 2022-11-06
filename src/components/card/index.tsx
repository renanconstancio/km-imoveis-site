import { CarouselIcons } from "../carousel";
import { Address } from "../address";
import { Price } from "../price";
import { H2 } from "../title";
import { Link } from "react-router-dom";
import { slugiFy } from "../../utils/functions";

type PropsCard = React.HTMLAttributes<HTMLLIElement> & {
  id: string;
  title: string;
  address: string;
  sale_price: string;
  rent_price: string;
  tags: string[];
  images: string[];
};

export function Card({
  id,
  title,
  address,
  sale_price,
  rent_price,
  images,
  tags,
}: PropsCard) {
  return (
    <li className="relative bg-slate-100">
      <Link to={`/immoble/${slugiFy(title)}/code/${id}`} className="block">
        {/* <ul className="absolute left-0 top-3 h-[auto] w-auto z-[9999] font-play text-white text-sm flex gap-2">
          <li className="p-1 bg-sky-600">a venda</li>
          <li className="p-1 bg-emerald-500">disponível</li>
        </ul> */}

        {/* <CarouselIcons images={images} /> */}

        <img src={images[0]} className="mx-auto object-cover" alt={title} />

        <div className="p-5">
          <H2 title={title} />

          <Address address={address} />

          {/* {sale_price && <Price price={sale_price} />} */}
          <Price price={rent_price} />

          <div
            className="font-[10] capitalize whitespace[-5] flex flex-row flex-wrap gap-1"
            dangerouslySetInnerHTML={{
              __html: `<span>${tags.join("</span><span>")}</span>`,
            }}
          />
          {/* <span className="box-border h-32 w-32 p-4 border-4">
            mais detalhes
          </span> */}
        </div>
      </Link>
    </li>
  );
}
