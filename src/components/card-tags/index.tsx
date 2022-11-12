import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBed,
  faCar,
  faExpand,
  faFan,
  faPhoneVolume,
  faShower,
  faSink,
  faTv,
  faJugDetergent,
  faUtensils,
  faBowlFood,
  faWaterLadder,
  faKitchenSet,
  faSnowflake,
  faDoorOpen,
  faWind,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";

type PropsTags = {
  cardTags: {
    tag: string;
    icon: string;
  }[];
  cardTag: string;
};

export function CardTags({ cardTags, cardTag }: PropsTags) {
  const arrayString = cardTag?.split(",");
  return (
    <>
      {cardTags.map(
        (r, index) =>
          arrayString.includes(`${r.tag}`) && (
            <span key={index}>
              {r.icon === "faTv" && <FontAwesomeIcon icon={faTv} />}
              {r.icon === "faWarehouse" && (
                <FontAwesomeIcon icon={faWarehouse} />
              )}
              {r.icon === "faCar" && <FontAwesomeIcon icon={faCar} />}
              {r.icon === "faBath" && <FontAwesomeIcon icon={faBath} />}
              {r.icon === "faKitchenSet" && (
                <FontAwesomeIcon icon={faKitchenSet} />
              )}
              {r.icon === "faWind" && <FontAwesomeIcon icon={faWind} />}
              {r.icon === "faSink" && <FontAwesomeIcon icon={faSink} />}
              {r.icon === "faBed" && <FontAwesomeIcon icon={faBed} />}
              {r.icon === "faExpand" && <FontAwesomeIcon icon={faExpand} />}
              {r.icon === "faFan" && <FontAwesomeIcon icon={faFan} />}
              {r.icon === "faSnowflake" && (
                <FontAwesomeIcon icon={faSnowflake} />
              )}
              {r.icon === "faJugDetergent" && (
                <FontAwesomeIcon icon={faJugDetergent} />
              )}
              {r.icon === "faBowlFood" && <FontAwesomeIcon icon={faBowlFood} />}
              {r.icon === "faWaterLadder" && (
                <FontAwesomeIcon icon={faWaterLadder} />
              )}
              {r.icon === "faUtensils" && <FontAwesomeIcon icon={faUtensils} />}
              {r.icon === "faDoorOpen" && <FontAwesomeIcon icon={faDoorOpen} />}
              {r.icon === "faShower" && (
                <FontAwesomeIcon icon={faShower} />
              )}{" "}
              {r.icon === "faPhoneVolume" && (
                <FontAwesomeIcon icon={faPhoneVolume} />
              )}
              {r?.tag}
            </span>
          ),
      )}
    </>
  );
}
