import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBed,
  faCar,
  faExpand,
  faFan,
  faShower,
  faSink,
  faStarOfLife,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { Address } from "../address";
import { Price } from "../price";
import { H2 } from "../title";
import { Link } from "react-router-dom";
import {
  situationText,
  situationTextClassName,
  slugiFy,
} from "../../utils/functions";

type PropsCard = React.HTMLAttributes<HTMLLIElement> & {
  id: string;
  situation: string;
  reference: string;
  description: string;
  descriptionText: string;
  terrainArea: string;
  buildingArea: string;
  address: string;
  salePrice: string;
  rentPrice: string;
  images: string[];
  tags: {
    tag: string;
    icon: string;
  }[];
};

export function Card({
  id,
  situation,
  reference,
  description,
  descriptionText,
  terrainArea,
  buildingArea,
  salePrice,
  rentPrice,
  address,
  images,
  tags,
}: PropsCard) {
  return (
    <li className="relative bg-slate-100">
      <Link
        to={`/immoble/${slugiFy(description)}/code/${id}`}
        className="block"
      >
        <ul className="absolute left-0 top-3 h-[auto] w-auto z-[9999] font-play text-white text-sm flex gap-2">
          <li className={`p-1 ${situationTextClassName(situation)}`}>
            {situationText(situation)}
          </li>
        </ul>

        <img
          src={images[0]}
          className="mx-auto object-cover"
          alt={description}
        />

        <div className="p-5">
          <small>CÓD.: {reference}</small>
          <H2 title={description} />

          <Address address={address} />

          {Number(salePrice) * 1 > 0 && <Price price={salePrice} />}

          {Number(rentPrice) * 1 > 0 && <Price price={rentPrice} />}

          <section className="text-xs capitalize whitespace[-2] flex flex-row flex-wrap gap-3">
            <span>
              <FontAwesomeIcon icon={faExpand} /> {terrainArea}
            </span>
            <span>
              <FontAwesomeIcon icon={faExpand} /> {buildingArea}
            </span>
            {tags.map((r, index) => {
              if (descriptionText?.split(",").includes(`${r.tag}`)) {
                return (
                  <span key={index}>
                    {r.icon === "faTv" && <FontAwesomeIcon icon={faTv} />}
                    {r.icon === "faCar" && <FontAwesomeIcon icon={faCar} />}
                    {r.icon === "faBath" && <FontAwesomeIcon icon={faBath} />}
                    {r.icon === "faStarOfLife" && (
                      <FontAwesomeIcon icon={faStarOfLife} />
                    )}
                    {r.icon === "faSink" && <FontAwesomeIcon icon={faSink} />}
                    {r.icon === "faBed" && <FontAwesomeIcon icon={faBed} />}
                    {r.icon === "faExpand" && (
                      <FontAwesomeIcon icon={faExpand} />
                    )}
                    {r.icon === "faFan" && <FontAwesomeIcon icon={faFan} />}
                    {r.icon === "faShower" && (
                      <FontAwesomeIcon icon={faShower} />
                    )}{" "}
                    {r?.tag}
                  </span>
                );
              }
            })}
          </section>
          {/* <span className="box-border h-32 w-32 p-4 border-4">
            mais detalhes
          </span> */}
        </div>
      </Link>
    </li>
  );
}
