import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { Address } from "../address";
import { Price } from "../price";
import { H2 } from "../title";
import { Link } from "react-router-dom";
import {
  situationText,
  situationTextClassName,
  slugiFy,
} from "../../utils/functions";
import { CardTags } from "../card-tags";

type PropsCard = React.HTMLAttributes<HTMLLIElement> & {
  reference: string;
  description: string;
  terrainArea: string;
  buildingArea: string;
  address: string;
  salePrice: string;
  rentPrice: string;
  images: string[];
  situation: "exchange" | "location" | "purchase" | "sale";
  // city?: {
  //   city: string;
  //   state: {
  //     state: string;
  //   };
  // };
  tags: {
    tag: string;
    icon: string;
  }[];
  tag: string;
};

export function Card({
  situation,
  reference,
  description,
  terrainArea,
  buildingArea,
  salePrice,
  rentPrice,
  address,
  images,
  tags,
  tag,
}: PropsCard) {
  return (
    // <li className="relative bg-white overflow-hidden">
    <Link
      to={`/${slugiFy(
        `${situationText(situation)}`,
      )}/imovel/${reference}/${slugiFy(`${description}`)}`}
      className="block relative bg-white overflow-hidden"
    >
      <ul className="absolute left-0 top-3 h-[auto] w-auto z-[9999] font-play text-white text-sm flex gap-2">
        <li className={`p-1 ${situationTextClassName(situation)}`}>
          {situationText(situation)}
        </li>
      </ul>

      <img src={images[0]} className="mx-auto w-full" alt={description} />

      <div className="p-5">
        <small>CÓD.: {reference}</small>
        <H2 title={description} />

        <Address address={address} />

        {Number(salePrice) * 1 > 0 && <Price price={salePrice} />}

        {Number(rentPrice) * 1 > 0 && <Price price={rentPrice} />}

        <section className="text-xs capitalize whitespace[-2] flex flex-row flex-wrap gap-3">
          {terrainArea && (
            <span>
              <FontAwesomeIcon icon={faExpand} /> {terrainArea}
            </span>
          )}
          {buildingArea && (
            <span>
              <FontAwesomeIcon icon={faExpand} /> {buildingArea}
            </span>
          )}

          <CardTags cardTag={tag} cardTags={tags} />
        </section>
      </div>
    </Link>
    // </li>
  );
}
